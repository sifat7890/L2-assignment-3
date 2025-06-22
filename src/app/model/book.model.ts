import { model, Schema } from "mongoose";
import { BooksStaticMethod, IBook } from "../interface/book.interface";


const bookSchema = new Schema<IBook, BooksStaticMethod>({
    title: { type: String, required: [true, "title doesn't exists"], trim: true },
    author: { type: String, required: true },
    genre: {
        type: String,
        enum: {
            values: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
            message: "Genre is not valid , got {VALUE}"
        }
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String, trim: true },
    copies: {
        type: Number,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: "Copies must be an integer"
        },
        min: [0, "Copies must be a positive number"]
    },

    available: { type: Boolean, default: true }
}, {
    versionKey: false,
    timestamps: true,
})


bookSchema.static('updateAvailable', async function (bookID: string) {
    const book = await this.findById(bookID);
    if (book) {
        book.available = book.copies > 0;
        await book.save();
    }
})

export const Book = model<IBook, BooksStaticMethod>("Book", bookSchema)