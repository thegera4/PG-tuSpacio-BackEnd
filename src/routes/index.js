const { Router } = require('express');

const productsRoute = require('./products');
const categoriesRoute = require('./categories');
const detailProductRoute = require('./detailproduct.js');

const router = Router();

router.use("/products", productsRoute);
router.use("/product", detailProductRoute);
router.use("/categories", categoriesRoute);

module.exports = router;