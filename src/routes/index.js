const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const productsRoutes = require("./products");
const categoriesRoutes = require("./categories");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/products", productsRoutes);
router.use("/categories", categoriesRoutes);

module.exports = router;
