const { Router } = require('express');

const productsRoute = require('./products');
const categoriesRoute = require('./categories');

const router = Router();

router.use("/products", productsRoute);
router.use("/categories", categoriesRoute);

module.exports = router;