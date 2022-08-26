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

/* UPDATE ONE CATEGORY IN THE DATABASE */
const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    /* FIND CATEGORY IN THE DATABASE BY ID */
    let categoryDB = await Categorie.findOne({
      where: {
        id: id,
      },
    });

    const updatedCategory = await categoryDB.update({
      name,
    });

    res.status(200).send({
      succMsg: "Category Updated Successfully!",
      updatedCategory,
    });
  } catch (error) {
    next(error);
  }
};

/* DELETE ONE CATEGORY IN THE DATABASE */
const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const categoryDB = await Categorie.findByPk(id);

    if (categoryDB === null) {
      return res.status(400).send("Category not found!");
    } else {
      await categoryDB.destroy();
      return res.status(200).send("Category Deleted Successfully! ");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory
};
