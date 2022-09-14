// const { Product, Categorie } = require("../db");
const axios = require("axios")
const { URL_API } = require("./globalConst")


/* GET ALL PRODUCTS FROM DB */
const getProductsBrand = async (req, res, next) => {

    const brand = req.query.brand   
    try {
        const api = await axios(URL_API + "/products")
        const e = api.data;
        let allProducts = e.map(e => e.brand)
        let clearRepet = new Set(allProducts)
        let allProductsBrand = [...clearRepet]
        res.send(allProductsBrand)
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProductsBrand
};
