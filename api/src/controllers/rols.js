const { Rol } = require("../db");
const axios = require("axios");
const { URL_API } = require("./globalConst");

/* GET ALL ROLS FROM DB */
const getAllRols = async (req, res, next) => {
    try {
        const dbInfo = await Rol.findAll();
        res.send(dbInfo);
    } catch (error) {
        console.log(error);
    }
};

/* CREATE NEW PRODUCT IN THE DATABASE */
const createRol = async (req, res, next) => {
  try {
    /* ME TRAIGO TODOS LOS VALORES DEL CUERPO DE LA PETICION */
    const {
      rolName,
      status,
    } = req.body;
    /* CREATE NEW PRODUCT */
    const newRol = await Rol.create({
      rolName,
      status,
    });

    res.status(200).json({
      succMsg: "Rol Created Successfully!",
      newRol,
    });
  } catch (error) {
    next(error);
  }
};

/* UPDATE ONE PRODUCT IN THE DATABASE */
const updateRol = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
        rolName,
        status,
    } = req.body;

    /* BUSCO EL ROL EN LA BD POR EL ID */
    let rolDB = await Rol.findOne({
      where: {
        id: id,
      },
    });
    /* ACTUALIZO EL PRODUCT CON LOS DATOS QUE RECIBO DEL BODY */
    const updatedRol = await rolDB.update({
        rolName,
        status
    });
        res.status(200).send({
      succMsg: "Rol Updated Successfully!",
      updatedRol,
    });
  } catch (error) {
    next(error);
  }
};

/* DESTROY ROL IN THE DATABASE */
const destroyRol = async (req, res, next) => {
  try {
    const { id } = req.params;
    /* BUSCO EL ROL EN LA BD POR EL ID */
    let rolDB = await Rol.findOne({
        where: {
            id: id,
        },
    });
    /* ELIMINO EL ROL */
    await rolDB.destroy();
    res.status(200).send({
        succMsg: "Rol Deleted Successfully!",
    });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllRols,
    createRol,
    updateRol,
    destroyRol,
};
