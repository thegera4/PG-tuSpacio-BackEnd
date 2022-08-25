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

/* CREATE NEW CATEGORY IN THE DATABASE */
const createCategory = async (req, res, next) => {
  try {
    /* ME TRAIGO TODOS LOS VALORES DEL CUERPO DE LA PETICION */
    const { name } = req.body;
    /* CREATE NEW CATEGORY */
    const newCategory = await Categorie.create({
      name,
    });

    res.status(200).json({
      succMsg: "Category Created Successfully!",
      newCategory,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCategories,
  createCategory,
};
