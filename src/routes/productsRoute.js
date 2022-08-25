const { Router } = require("express");
const { getAllProducts } = require("../controllers/Products.js");

const router = Router();

router.get("/", getAllProducts);

module.exports = router;