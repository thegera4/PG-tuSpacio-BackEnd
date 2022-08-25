const { Router } = require('express');
const productsRoute = require('./productsRoute');

const router = Router();

router.use("/products", productsRoute);

module.exports = router;
