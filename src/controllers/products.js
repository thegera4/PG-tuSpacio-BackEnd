const { Product, Categorie } = require("../db");

/* GET ALL PRODUCTS FROM DB */
const getAllProducts = async (req, res, next) => {
  try {
    const AllProducts = await Product?.findAll({
      include: {
        model: Categorie,
        attributes: ["name"],
      },
    });

    res.status(200).send(AllProducts);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
};
