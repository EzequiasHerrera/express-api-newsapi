import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required."],
            unique: true,
            trim: true, // Elimina espacios en blanco al inicio y final
            minlength: [5, "The title must be at least 5 characters."],
        },
        text: {
            type: String,
            required: [true, "Text is required"],
            trim: true, //Elimina espacios en blanco atras y adelante del string
            minlength: [20, "The text must be at least 5 characters."],
        },
        createdBy: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: [3, "Name must be at least 3 characters"],
        }
    },
    {
        collection: "news", // Nombre explícito de la colección
        timestamps: true, // Agrega createdAt y updatedAt automáticamente
    }
);

const News = mongoose.model("News", newsSchema);

export default News;
