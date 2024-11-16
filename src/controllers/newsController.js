const getAllNews = (req, res) => {
    res.send("Get all news");
}

const getOneNew = (req, res) => {
    res.send("Get ONE news");
}

const createNews = (req, res) => {
    req.send("Creating a New");
}

const deleteAllNews = (req, res) => {
    req.send("Deleting ALL News");
}

const deleteOneNew = (req, res) => {
    req.send("Deleting ONE New");
}

export {
    getAllNews,
    getOneNew,
    createNews,
    deleteAllNews,
    deleteOneNew
} 