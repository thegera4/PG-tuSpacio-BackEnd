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

/* CREATE NEW PRODUCT IN THE DATABASE */
const createProduct = async (req, res, next) => {
  try {
    /* ME TRAIGO TODOS LOS VALORES DEL CUERPO DE LA PETICION */
    const { name, features, price, image, status, stock, category_id } =
      req.body;
    /* CREATE NEW PRODUCT */
    const newProduct = await Product.create({
      name,
      features,
      price,
      image,
      status,
      stock,
      category_id,
    });

    res.status(200).json({
      succMsg: "Product Created Successfully!",
      newProduct,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  createProduct,
};

