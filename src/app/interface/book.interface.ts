import { Model } from "mongoose";

export interface IBook {
    title: string,
    author: string,
    genre: 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY',
    isbn: string,
    description?: string,
    copies: number,
    available: boolean

}

export interface BooksStaticMethod extends Model<IBook> {
    updateAvailable(bookID: string ): Promise<void>
}