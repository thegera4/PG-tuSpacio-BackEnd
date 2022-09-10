const { User, Product } = require("../db");
const axios = require("axios");
const { URL_API } = require("./globalConst");

/* GET ALL USERS FROM DB */

const getAllUsers = async (req, res) => {
  try {
    const dbInfo = await User.findAll();
    res.send( dbInfo)
  } catch (error) {
    console.log(error);
  }
};


/* CREATE NEW USER IN THE DATABASE */
const createUser = async (req, res, next) => {
  try {
    /* ME TRAIGO TODOS LOS VALORES DEL CUERPO DE LA PETICION */
    const {
            nickname,
            name,
            email,
            email_verified,
            sid,
            picture,
            address,
            status,
            rol_id } = req.body;

    /* CREATE NEW USER */
    const newUser = await User.create({
        nickname,
        name,
        email,
        email_verified,
        sid,
        picture,
        address,
        status,
        rol_id,
    });

    res.status(200).json({
      succMsg: "User Created Successfully!",
      newUser,
    });
  } catch (error) {
    next(error);
  }
};

/* UPDATE ONE USER IN THE DATABASE */
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
            nickname,
            name,
            email,
            email_verified,
            sid,
            picture,
            address,
            status,
            rol_id } = req.body;
            
    /* BUSCO EL USER EN LA BD POR EL ID */
    const userDb = await User.findByPk(id);
    /* ACTUALIZO EL USER */
    const updatedUser = await userDb.update({
        nickname,
        name,
        email,
        email_verified,
        sid,
        picture,
        address,
        status,
        rol_id,
    });
    res.status(200).json({
        succMsg: "User Updated Successfully!",
        updatedUser,
    });
    } catch (error) {
        next(error);
    }
};

/* DELETE ONE USER IN THE DATABASE */
const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        /* BUSCO EL USER EN LA BD POR EL ID */
        const userDb = await User.findByPk(id);
        /* MODIFICO EL STATUS DEL USER PARA HACER UN BORRADO LOGICO */
        const updatedUser = await userDb.update({
          status: false,
      });
        res.status(200).json({
            succMsg: "User Deleted Successfully!",
        });
    } catch (error) {
        next(error);
    }
};

/* INSERT FAVORITE PRODUCT TO A USER */
const addFavorite = async (req, res, next) => {
  try {
    const { idUser } = req.params;
    const { idProduct } = req.params;
    const userDb = await User.findByPk(idUser);
    const productDb = await Product.findByPk(idProduct);
    await userDb.addProduct(productDb);
    res.status(200).json({
      succMsg: "Favorite Added Successfully!",
    });
  } catch (error) {
    next(error);
  }
};
/* DELETE FAVORITE PRODUCT TO A USER */
const deleteFavorite = async (req, res, next) => {
  try {
    const { idUser } = req.params;
    const { idProduct } = req.params;
    const userDb = await User.findByPk(idUser);
    const productDb = await Product.findByPk(idProduct);
    await userDb.removeProduct(productDb);
    res.status(200).json({
      succMsg: "Favorite Deleted Successfully!",
    });
  } catch (error) {
    next(error);
  }
};
/* GET ALL FAVORITES FROM A USER */
const getAllFavorites = async (req, res) => {
  try {
    const { idUser } = req.params;
    const userDb = await User.findByPk(idUser);
    const favorites = await userDb.getProducts();
    res.send(favorites.map((favorite) => favorite.id));
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    addFavorite,
    deleteFavorite,
    getAllFavorites,
};
