const { Product } = require("../db");
const axios = require("axios")
const { URL_API } = require("./globalConst")


/* GET ONE CATEGORY FROM JSON */
const getSearchProducts = async (req, res, next) => {
    const { categorie, product_type, name } = req.query;

    const resp = await axios.get(URL_API)
    const dataApi = resp.data
    
    /* FILTRADO DE PAGINAS CON IMAGENES QUE NO FUNCIONAN */
    const e = dataApi.filter(e => !e.image_link.includes("purpicks") )
    const e1 = e.filter(e => !e.image_link.includes("static-assets.glossier") )
    const e2 = e1.filter(e => !e.image_link.includes("imancosmetics") )


    if (name) {
        try {
            let resultCategory = e2.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))

            // product_type ? resultCategory = resultCategory.filter(e => e.product_type.toLowerCase().includes(product_type.toLowerCase())) : null
            // categorie ? resultCategory = resultCategory.filter(e => e.category.toLowerCase().includes(categorie.toLowerCase())) : null

            res.send(resultCategory);
        } catch (error) {
            next(error);
        }
    } else if (product_type) {
        try {
            let resultCategory = dataApi.filter(e => e.product_type.toLowerCase().includes(product_type.toLowerCase()))

            res.send(resultCategory);
        } catch (error) {
            next(error);
        }
    } else if (categorie) {
        try {
            let resultCategory = dataApi.filter(e => e.category.includes(categorie))
    
            res.send(resultCategory);
        } catch (error) {
            next(error);
        }
    } else{
        res.send("You must enter a valid data")
    }
}
module.exports = {
    getSearchProducts
};