const { Router } = require('express');

const productsRoute = require('./products');
const categoriesRoute = require('./categories');
const detailProductRoute = require('./detailproduct.js');
const searchProductsRoute = require('./searchproducts.js');
const oneCategoriesRoute = require('./oneCategorie.js') 

const router = Router();

/*_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
                RUTAS DE PRODUCTS
_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/*/
router.use("/product", detailProductRoute);
router.use("/products/search/", searchProductsRoute);
router.use("/products", productsRoute);
// router.use("/product/rating")

/*_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
                RUTAS DE CATEGORIES
_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/*/
router.use("/categorie", oneCategoriesRoute);
router.use("/categories", categoriesRoute);



module.exports = router;