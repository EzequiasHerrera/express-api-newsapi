import express from "express";
const router = express.Router();
import { getAllNews, getOneNew, createNews, deleteAllNews, deleteOneNew } from "../../controllers/newsController.js";

router
    .get("/", getAllNews)
    .get("/:newId", getOneNew)
    .post("/", createNews)
    .delete("/", deleteAllNews)
    .delete("/:newId", deleteOneNew)

export default router