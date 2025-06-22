import express, { Request, Response } from 'express';
import { Borrow } from '../model/borrow.model';
import { Book } from '../model/book.model';



export const borrowRoutes = express.Router();

borrowRoutes.post('', async (req: Request, res: Response) => {
    try {

        const body = req.body;
        const bookID = body.book;
        const book = await Book.findById(bookID);

        if (!book) {
            res.status(404).json(
                {
                    success: false,
                    message: 'Book not found'

                }
            );
            return;
        }
        if (book.copies < body.quantity) {
            res.status(404).json(
                {
                    success: false,
                    message: 'Book copies not available'

                }
            );
            return;
        }
        book.copies -= body.quantity;
        await book.save();
        await Book.updateAvailable(bookID)


        const borrow = await Borrow.create(body)

        res.status(201).json({
            success: true,
            message: "Borrow created successfully",
            borrow
        })
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



borrowRoutes.get('', async (req: Request, res: Response) => {



    const borrow = await Borrow.aggregate([
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
    ])


    res.status(201).json({
        success: true,
        message: "Borrowed books retrieved successfully",
        borrow
    })

})