import express from "express";
import v1NewsRouter from './v1/routes/newsRoutes.js';
import mongoose from "mongoose";
import { errorHandler } from "./helpers/errorHandler.js";

class Server {
    constructor() {
        this.port = process.env.PORT || 3000;
        this.app = express();
        this.app.use(express.json());
        this.setRoutes();
        this.app.use(errorHandler);
        this.connectBD();
    }

    setRoutes() {
        this.app.use("/api/v1/news", v1NewsRouter);
    }

    async connectBD() {
        try {
            await mongoose.connect(process.env.MONGODB_URI)
            console.log('Connected succesfully to Database')
        } catch (err) {
            console.log('Error connecting to Database', err);
        }
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Server running on ${process.env.PORT}`)
        })
    }
}

export default Server;
