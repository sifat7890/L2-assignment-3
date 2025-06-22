"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = exports.borrowSchema = void 0;
const mongoose_1 = require("mongoose");
exports.borrowSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    dueDate: {
        type: Date,
        required: true,
        default: () => {
            const today = new Date();
            today.setDate(today.getDate() + 30);
            return today;
        }
    }
}, {
    timestamps: true
});
exports.Borrow = (0, mongoose_1.model)("Borrow", exports.borrowSchema);
