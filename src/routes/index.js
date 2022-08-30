const { Router } = require('express');

const productsRoute = require('./products');
const detailProductRoute = require('./detailproduct.js');
const searchProductsRoute = require('./searchproducts.js');
const ratingRoute = require('./ratingproducts.js');
const productsNameRoute = require('./productsName.js');
const categoriesRoute = require('./categories');
const oneCategoriesRoute = require('./oneCategorie.js') 

const router = Router();

/*_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
                RUTAS DE PRODUCTS
_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/*/
router.use("/product", detailProductRoute);
router.use("/products", productsRoute);
router.use("/products/name", productsNameRoute);
router.use("/products/search/", searchProductsRoute);
router.use("/products/rating/", ratingRoute);

/*_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
                RUTAS DE CATEGORIES
_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/*/
router.use("/categorie", oneCategoriesRoute);
router.use("/categories", categoriesRoute);



module.exports = router;