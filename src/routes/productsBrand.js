const { Router } = require("express");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});

/* LINKS TO DOCS JOI AND EXPRESS-JOI-VALIDATION 
https://joi.dev/api/?v=17.6.0
https://github.com/evanshortiss/express-joi-validation#readme
*/

const {
    getProductsBrand,
} = require("../controllers/productsbrand.js");

const router = Router();

/* GET DETAIL PRODUCT FRONT THE DATABASE */

router.get("/", getProductsBrand);

module.exports = router;
