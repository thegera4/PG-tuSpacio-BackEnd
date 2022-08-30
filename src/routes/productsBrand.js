const { Router } = require("express");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});


const {
    getProductsBrand,
} = require("../controllers/productsbrand.js");

const router = Router();

/* GET DETAIL PRODUCT FRONT THE DATABASE */

router.get("/", getProductsBrand);

module.exports = router;
