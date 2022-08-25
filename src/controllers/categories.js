const { Categorie } = require("../db");

/* GET ALL CATEGORIES FROM DB */
const getAllCategories = async (req, res, next) => {
  try {
    const AllCategories = await Categorie?.findAll();

    res.status(200).send(AllCategories);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCategories,
};
