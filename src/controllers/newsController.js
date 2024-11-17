import NewsModel from "../models/news.js";
import mongoose from "mongoose";
import { checkExists } from "../helpers/errorHandler.js"

const getAllNews = async (req, res, next) => {
    try {
        const allNews = await NewsModel.find();
        checkExists(allNews, "News Database it's empty", 404);
        res.status(200).json(allNews);
    } catch (error) {
        next(error);
    }
}

const getOneNew = async (req, res, next) => {
    try {
        const newId = req.params.newId;
        checkExists(mongoose.Types.ObjectId.isValid(newId), "Wrong input for ID", 400);

        const wantedNew = await NewsModel.findById(newId);
        checkExists(wantedNew, "Wanted's New doesn't exist.", 404);

        res.status(200).json(wantedNew);
    } catch (error) {
        next(error);
    }
}

const createNews = async (req, res, next) => {
    try {
        const userIp = req.ip || req.headers['x-forwarded-for'];
        const newsToCreate = new NewsModel({ ...req.body, userIp: userIp }); //Adding IP to the body
        const createdNew = await newsToCreate.save();
        res.status(201).json({ message: "New created correctly", data: createdNew });
    } catch (error) {
        next(error);
    }
}

const deleteAllNews = async (req, res, next) => {
    try {
        await NewsModel.deleteMany({});
        res.status(200).json({ message: "All the News has being deleted correctly" })
    } catch (error) {
        next(error)
    }
}

const deleteOneNew = async (req, res, next) => {
    try {
        const newId = req.params.newId;
        checkExists(newId, "New's ID is needed.", 400);

        const deletedNew = await NewsModel.findByIdAndDelete(newId);
        res.status(200).json({ message: "New has being deleted correctly", data: deletedNew })
    } catch (error) {
        next(error)
    }
}

export {
    getAllNews,
    getOneNew,
    createNews,
    deleteAllNews,
    deleteOneNew
} 