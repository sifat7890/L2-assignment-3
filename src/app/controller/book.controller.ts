import express, { Request, Response } from 'express';
import { Book } from '../model/book.model';


export const booksRoutes = express.Router();

booksRoutes.post('/create-book', async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const book = await Book.create(body);

 
        res.status(201).json({
            success: true,
            message: "Book create successfully",
            book
        })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: "Validation failed",
            error
        })
    }
})



booksRoutes.get('/books', async (req: Request, res: Response) => {

    try {
        const bookGenre = req.query.filter ? req.query.filter : "";

        const sortBy = "createdAt";
        const sort = "desc";
        const limit = 10;

        let books = [];
        if (bookGenre) {
            books = await Book.find({ genre: bookGenre }).sort({ [sortBy]: sort }).limit(limit);
        }
        else {
            books = await Book.find()
        }

        res.status(201).json({
            success: true,
            message: "books retrieved successfully",
            books
        });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message,
            error
        })
    }

})


booksRoutes.get('/books/:id', async (req: Request, res: Response) => {
    const bookId = req.params.id;
    const books = await Book.findById(bookId);
    res.status(201).json({
        success: true,
        message: "books retrieved successfully",
        books
    })
})


booksRoutes.patch('/edit-book/:id', async (req: Request, res: Response) => {
    const bookId = req.params.id;
    const updatedBody = req.body;
    const book = await Book.findByIdAndUpdate(bookId, updatedBody, { new: true });

    res.status(201).json({
        success:true,
        message:"Book updated  successfully",
        book
    })
})

booksRoutes.delete('/books/:bookId', async (req: Request, res: Response) => {

    const bookId = req.params.bookId;
    const book = await Book.findByIdAndDelete(bookId);
    

    res.status(201).json({
        success: true,
        message: "Book deleted successfully",
        book
    })

})