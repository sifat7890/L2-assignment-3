import express, { Application, Request, Response } from "express"
import cors from "cors";
import { booksRoutes } from "./app/controller/book.controller";
import { borrowRoutes } from "./app/controller/borrow.controller";


const app: Application = express();
app.use(cors());

app.use(express.json());
app.use("/api", booksRoutes);
app.use("/api",borrowRoutes)

app.get('/', (req: Request, res: Response) => {
    res.send("Welcome to library management")
})
app.use(
  cors({
    origin: 'https://l2-assignment-4-psi.vercel.app'
   })
);


export default app;