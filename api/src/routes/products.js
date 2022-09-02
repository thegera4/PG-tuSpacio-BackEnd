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
  brand: Joi.string().min(3).max(100).required(),
  name: Joi.string().min(3).max(100).required(),
  price: Joi.number().min(1).precision(1).required(),
  price_sign: Joi.string().min(1).max(5).required(),
  currency: Joi.string().min(1).max(5).required(),
  image_link: Joi.string()
    .regex(/([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i)
    .max(255),
  description: Joi.string().min(3).max(1500).required(),
  rating: Joi.number().precision(1).min(0).max(5).required(),
  product_type: Joi.string().min(3).max(100).required(),
  stock: Joi.number().min(1).required(),
  product_colors: Joi.array().items(
    Joi.object({
      hex_value: Joi.string(),
      colour_name: Joi.string(),

    })
  ),
  tag_list: Joi.array().items(Joi.string()),
  categories: Joi.array().items(Joi.string()),
  status: Joi.boolean(),
});

const {
  getAllProducts,
  createProduct,
  updateProduct,
  disableProduct,
} = require("../controllers/products");

const router = Router();

/* SE ARMAN LAS RUTAS PASANDO LAS VALIDACIONES COMO MIDDLEWARES */

/* GET ALL PRODUCTS FRONT THE DATABASE */
router.get("/", getAllProducts);

/* CREATE NEW PRODUCT IN THE DATABASE */
router.post("/", validator.body(bodySchema), createProduct);

/* UPDATE PRODUCT IN THE DATABASE */
router.put(
  "/:id",
  validator.params(paramsSchema),
  validator.body(bodySchema),
  updateProduct
);

/* DISABLED PRODUCT IN THE DATABASE */
router.delete("/:id", validator.params(paramsSchema), disableProduct);

module.exports = router;
