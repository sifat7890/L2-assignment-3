import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';


let server: Server
const PORT = 5000;


async function run() {
    try {

        await mongoose.connect('mongodb+srv://libraryManagement:No0FFP8tWUgpaFN5@cluster0.xox9a.mongodb.net/library-managementDB?retryWrites=true&w=majority&appName=Cluster0')

        console.log("Connected to mongodb using mongoose");

        server = app.listen(PORT, () => {
            console.log(`App is listing on port ${PORT}`);

        })
    } catch (error) {
        console.log(error);

    }
}
run();