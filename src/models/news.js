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
        },
        userIp: {
            type: String,
            required: [true, "IP is required"],
        },
    },
    {
        collection: "news", // Nombre explícito de la colección
        timestamps: true, // Agrega createdAt y updatedAt automáticamente
    }
);

newsSchema.pre("save", async function (next) {
    const userIp = this.userIp;
    console.log("Entré en el pre save")
    try {
        const lastUserPosts = await News.find({ "userIp": userIp }).sort({ "createdAt": -1 }); //Sort from greater to lower

        if (lastUserPosts.length >= 3) {
            console.log("El IP tiene 3 o mas posts")

            const lastPostTime = lastUserPosts[0].createdAt;
            const currentTime = new Date();
            const timeDifferenceInHours = (currentTime - lastPostTime) / (1000 * 60 * 60);
            const minutesLeft = Math.ceil(60 - (timeDifferenceInHours * 60));

            if (timeDifferenceInHours < 1) {
                const error = new Error(`You can't create more than 3 posts within 1 hour. Time left: ${minutesLeft} (minutes)`);
                error.statusCode = 400;
                throw error;
            }
        }

        next();
    } catch (error) {
        next(error);
    }
});

const News = mongoose.model("News", newsSchema);

export default News;
