import { model, Schema } from "mongoose";
import { IBorrow } from "../interface/borrow.interface";



export const borrowSchema = new Schema<IBorrow>({
    book: {
        type: Schema.Types.ObjectId,
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
        required:true,
        default: () => {
            const today = new Date();
            today.setDate(today.getDate() + 30);
            return today;
        }
    }
},

    {
        timestamps: true
    }
)

export const Borrow = model("Borrow",borrowSchema)


