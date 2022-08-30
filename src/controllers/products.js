const { Product, Categorie } = require("../db");
const axios = require("axios")
const { URL_API } = require("./globalConst")


/* GET ALL PRODUCTS FROM DB */
const getAllProducts = async (req, res, next) => {
  try {
    const api = await axios(URL_API)
    const c = "cream"
    
    /* FILTRADO DE PAGINAS CON IMAGENES QUE NO FUNCIONAN */
    const e = api.data.filter(e => !e.image_link.includes("purpicks") )
    const e1 = e.filter(e => !e.image_link.includes("static-assets.glossier") )
    const e2 = e1.filter(e => !e.image_link.includes("imancosmetics") )
   

    res.status(200).json(e2);
  
  } catch (error) {
    next(error);
  
  }
}


/* CREATE NEW PRODUCT IN THE DATABASE */
const createProduct = async (req, res, next) => {
  try {
    /* ME TRAIGO TODOS LOS VALORES DEL CUERPO DE LA PETICION */
    const { name, description, price, currency, image, rating, categories } =
      req.body;
    /* CREATE NEW PRODUCT */
    const newProduct = await Product.create({
      name,
      description,
      price,
      currency,
      image,
      rating
    });

    const categoriesDb = await Categorie.findAll({where: { name: categories }});  
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
    const { name, features, price, image, status, stock, category_id } =
      req.body;

    /* BUSCO EL PRODUCT DE LA BD POR EL ID */
    let productDB = await Product.findOne({
      where: {
        id: id,
      },
    });
    /* ACTUALIZO EL PRODUCT CON LOS DATOS QUE RECIBO DEL BODY */
    const updatedProduct = await productDB.update({
      name,
      features,
      price,
      image,
      status,
      stock,
      category_id,
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
        "name",
        "features",
        "price",
        "image",
        "status",
        "stock",
        "category_id",
      ],
      include: {
        model: Categorie,
        attributes: ["name", "id"],
      },
    });

    res.status(200).json({
      ok: true,
      disabledProduct,
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  disableProduct
};
