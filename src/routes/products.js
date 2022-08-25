const { Router } = require("express");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});

/* LINKS TO DOCS JOI AND EXPRESS-JOI-VALIDATION 
https://joi.dev/api/?v=17.6.0
https://github.com/evanshortiss/express-joi-validation#readme
*/

/* SE CREAN LOS OBJETOS CON LOS TIPOS DE VALIDACIONES */
const querySchema = Joi.object({
  name: Joi.string().regex(/^[a-zA-Z\s]+$/),
});

const paramsSchema = Joi.object({
  id: Joi.string().regex(/^([a-zA-Z0-9-]+)$/),
});

const bodySchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  features: Joi.string().min(3).max(500).required(),
  price: Joi.number().min(1).precision(1).required(),
  image: Joi.string()
    .regex(/([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i)
    .max(255),
  status: Joi.boolean(),
  stock: Joi.number().min(1).required(),
  category_id: Joi.string().min(1).max(50).required(),
});

const { getAllProducts } = require("../controllers/products");

const router = Router();

/* SE ARMAN LAS RUTAS PASANDO LAS VALIDACIONES COMO MIDDLEWARES */

/* GET ALL PRODUCTS */
router.get("/", getAllProducts);


module.exports = router;
