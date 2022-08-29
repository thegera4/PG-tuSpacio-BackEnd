const { Product } = require("../db");
const axios = require("axios")
const { URL_API } = require("./globalConst")


/* GET ONE CATEGORY FROM JSON */
const getRatingProduct = async (req, res, next) => {
    const {ratingMax, ratingMin}  = req.query;

    const resp = await axios.get(URL_API)
    const dataApi = resp.data

     /* FILTRADO DE PAGINAS CON IMAGENES QUE NO FUNCIONAN */
     const e = dataApi.filter(e => !e.image_link.includes("purpicks") )
     const e1 = e.filter(e => !e.image_link.includes("static-assets.glossier") )
     const e2 = e1.filter(e => !e.image_link.includes("imancosmetics") )

    try {
            let resultCategory = dataApi.filter(e => e.rating>= ratingMin && e.rating <= ratingMax);    

            res.send(e2);
        } catch (error) {
                next(error);
            }
}
module.exports = {
    getRatingProduct
};