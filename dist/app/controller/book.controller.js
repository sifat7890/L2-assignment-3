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
exports.booksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../model/book.model");
exports.booksRoutes = express_1.default.Router();
exports.booksRoutes.post('/create-book', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const book = yield book_model_1.Book.create(body);
        res.status(201).json({
            success: true,
            message: "Book create successfully",
            book
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Validation failed",
            error
        });
    }
}));
exports.booksRoutes.get('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookGenre = req.query.filter ? req.query.filter : "";
        const sortBy = "createdAt";
        const sort = "desc";
        const limit = 10;
        let books = [];
        if (bookGenre) {
            books = yield book_model_1.Book.find({ genre: bookGenre }).sort({ [sortBy]: sort }).limit(limit);
        }
        else {
            books = yield book_model_1.Book.find();
        }
        res.status(201).json({
            success: true,
            message: "books retrieved successfully",
            books
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
exports.booksRoutes.get('/books/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.id;
    const books = yield book_model_1.Book.findById(bookId);
    res.status(201).json({
        success: true,
        message: "books retrieved successfully",
        books
    });
}));
exports.booksRoutes.patch('/edit-book/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.id;
    const updatedBody = req.body;
    const book = yield book_model_1.Book.findByIdAndUpdate(bookId, updatedBody, { new: true });
    res.status(201).json({
        success: true,
        message: "Book updated  successfully",
        book
    });
}));
exports.booksRoutes.delete('/books/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const book = yield book_model_1.Book.findByIdAndDelete(bookId);
    res.status(201).json({
        success: true,
        message: "Book deleted successfully",
        book
    });
}));
