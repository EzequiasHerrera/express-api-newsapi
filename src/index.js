import env from 'dotenv/config'
import express from 'express';
import v1NewsRouter from './v1/routes/newsRoutes.js';

const app = express();

app.use("/api/v1/news", v1NewsRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server corriendo en ${process.env.PORT}`)
})