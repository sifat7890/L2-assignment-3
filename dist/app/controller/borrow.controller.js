"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const borrow_model_1 = require("../model/borrow.model");
const book_model_1 = require("../model/book.model");
exports.borrowRoutes = express_1.default.Router();
exports.borrowRoutes.post('', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const bookID = body.book;
        const book = yield book_model_1.Book.findById(bookID);
        if (!book) {
            res.status(404).json({
                success: false,
                message: 'Book not found'
            });
            return;
        }
        if (book.copies < body.quantity) {
            res.status(404).json({
                success: false,
                message: 'Book copies not available'
            });
            return;
        }
        book.copies -= body.quantity;
        yield book.save();
        yield book_model_1.Book.updateAvailable(bookID);
        const borrow = yield borrow_model_1.Borrow.create(body);
        res.status(201).json({
            success: true,
            message: "Borrow created successfully",
            borrow
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message,
            error
        });
    }
}));
exports.borrowRoutes.get('', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const borrow = yield borrow_model_1.Borrow.aggregate([
        {
            $group: {
                _id: '$book',
                totalQuantity: { $sum: '$quantity' }
            },
        },
        {
            $lookup: {
                from: 'books',
                localField: '_id',
                foreignField: '_id',
                as: "borrowBook",
            },
        },
        {
            $unwind: '$borrowBook'
        },
        {
            $project: {
                book: {
                    title: '$borrowBook.title',
                    isbn: '$borrowBook.isbn'
                },
                totalQuantity: 1
            }
        }
    ]);
    res.status(201).json({
        success: true,
        message: "Borrowed books retrieved successfully",
        borrow
    });
}));
