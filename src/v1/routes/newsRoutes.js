import express from "express";
const router = express.Router();
import { getAllNews, getOneNew, createNews, deleteAllNews, deleteOneNew } from "../../controllers/newsController.js";
import { rateLimiter } from "../../middlewares/rateLimiter.js"

router
    .get("/", getAllNews)
    .get("/:newId", getOneNew)
    .post("/", rateLimiter, createNews)
    .delete("/", deleteAllNews)
    .delete("/:newId", deleteOneNew)

export default router