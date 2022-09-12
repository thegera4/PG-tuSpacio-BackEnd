const { Product, Categorie } = require("../db");
const axios = require("axios");
const { URL_API } = require("./globalConst");
const { uploadCategoryDb } = require("../controllers/uploadCategoryDb")

/* GET ALL PRODUCTS FROM DB */
const getApiProducts = async (req, res, next) => {
  try {

    const api = await axios(URL_API);
    const resultAll = api.data;
    const result = resultAll.map(e => ({
      name: e.name,
      brand: e.brand,
      price: e.price,
      price_sign: e.price_sign,
      currency: e.currency,
      image_link: e.image_link,
      description: e.description,
      rating: e.rating,
      product_type: e.product_type,
      stock: Math.floor(Math.random()* 99 + 1 ),
      tag_list: e.tag_list,
      product_colors: e.product_colors,
      status: Math.random() >= 0.5,
      categories: e.category,
    }))
    return result;
  } catch (error) {
    console.log(error);
  }
};
const getDbProducts = async (req, res) => {
  try {
    const dbInfo = await Product.findAll({
      include: {
        model: Categorie,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });
    return dbInfo;
  } catch (error) {
    console.log(error);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const apiInfo = await getApiProducts();

    const dbInfo = await getDbProducts();

    res.send([...dbInfo, ...apiInfo]);
    //res.send([...dbInfo]);

  } catch (error) {
    return error;
  }
};

/* CREATE NEW PRODUCT IN THE DATABASE */
const createProduct = async (req, res, next) => {
  // const api = await axios(URL_API)
  // const resApi = api.data
  // const result = resApi.map(e=> ({
  //   name: e.name,
  //   brand: e.brand,
  //   price: e.price,
  //   price_sign: e.price_sign,
  //   currency: e.currency,
  //   image_link: e.image_link,
  //   description: e.description,
  //   rating: e.rating,
  //   product_type: e.product_type,
  //   stock:50,
  //   tag_list: e.tag_list,
  //   product_colors: e.product_colors,
  //   categories: e.category,
  // }))

  // const carga = Product.bulkCreate(result, {
  //   include: Categorie,
  // }).then(result=>{
  //   console.log(result)
  //   res.send(result)
  // })
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
      status,
      categories,
    });
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
  try {
    const { id } = req.params;
    await Product.update(
      { status: false },
      {
        where: {
          id: id,
        },
      }
    );

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
  getApiProducts,
  getDbProducts,
  createProduct,
  updateProduct,
  disableProduct,
  getDashboard
};
