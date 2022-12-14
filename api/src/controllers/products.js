const { Product, Categorie } = require("../db");
const axios = require("axios");
const { URL_API } = require("./globalConst");
const { uploadCategoryDb } = require("../controllers/uploadCategoryDb")

/* GET ALL PRODUCTS FROM DB */
const getAllProducts = async (req, res, next) => {
  try {
    const dbInfo = await Product.findAll({
      where: { status: true},
      include: {
        model: Categorie,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });
    res.send(dbInfo);
  } catch (error) {
    console.log(error);
  }
};

/* CREATE NEW PRODUCT IN THE DATABASE */
const createProduct = async (req, res, next) => {
  try {
    /* ME TRAIGO TODOS LOS VALORES DEL CUERPO DE LA PETICION */
    const {
      brand,
      name,
      price,
      price_sign,
      currency,
      image_link,
      description,
      rating,
      product_type,
      stock,
      tag_list,
      product_colors,
      status,
      categories,
    } = req.body;
    /* CREATE NEW PRODUCT */
    const newProduct = await Product.create({
      brand,
      name,
      price,
      price_sign,
      currency,
      image_link,
      description,
      rating,
      product_type,
      stock,
      tag_list,
      product_colors,
      status,
    });

    const categoriesDb = await Categorie.findAll({
      where: { name: categories },
    });
    newProduct.addCategorie(categoriesDb);

    res.status(200).json({
      succMsg: "Product Created Successfully!",
      newProduct,
    });
  } catch (error) {
    next(error);
  }
};

/* UPDATE ONE PRODUCT IN THE DATABASE */
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      brand,
      name,
      price,
      price_sign,
      currency,
      image_link,
      description,
      rating,
      product_type,
      stock,
      tag_list,
      product_colors,
      status,
      categories,
    } = req.body;

    /* BUSCO EL PRODUCT DE LA BD POR EL ID */
    let productDB = await Product.findOne({
      where: {
        id: id,
      },
    });
    /* ACTUALIZO EL PRODUCT CON LOS DATOS QUE RECIBO DEL BODY */
    const updatedProduct = await productDB.update({
      brand,
      name,
      price,
      price_sign,
      currency,
      image_link,
      description,
      rating,
      product_type,
      stock,
      tag_list,
      product_colors,
      status
    });
    const categoriesDb = await Categorie.findAll({
      where: { name: categories },
    });
    updatedProduct.addCategorie(categoriesDb);
    
    res.status(200).send({
      succMsg: "Product Updated Successfully!",
      updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

/* DISABLED ONE PRODUCT IN THE DATABASE */
const disableProduct = async (req, res, next) => {
  const { status } = req.query
  try {
    const { id } = req.params;

    if( status === 'on') {
    await Product.update(
      { status: true },
      {
        where: {
          id: id,
        },
      }
    )
  }

  if( status === 'off') {
    await Product.update(
      { status: false },
      {
        where: {
          id: id,
        },
      }
    )
  }

    const disabledProduct = await Product.findByPk(id, {
      attributes: [
        "id",
        "brand",
        "name",
        "price",
        "price_sign",
        "currency",
        "image_link",
        "description",
        "rating",
        "product_type",
        "stock",
        "tag_list",
        "product_colors",
        "status",
      ],
    });

    res.status(200).json({
      ok: true,
      disabledProduct,
    });
  } catch (error) {
    next(error);
  }
};

const getDashboard = async (req, res) => {

  try {
    const data = await Product.findAll({
      attributes: ["id", "name", "stock"]
    })
    res.send(data)
  } catch (error) {
    res.send({ message: error.message })
  }
}





module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  disableProduct,
  getDashboard,
};
