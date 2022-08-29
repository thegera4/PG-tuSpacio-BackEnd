const { Product } = require("../db");
const axios = require("axios")
const { URL_API } = require("./globalConst")


/* GET DETAIL PRODUCT FROM JSON */
const getDetailProduct = async (req, res, next) => {
    const id = req.params.id;

    const resp = await axios.get(URL_API)
    const detail = resp.data
    try {
        let detail2 = detail.find(e => e.id == id)

        /* FILTRADO DE PAGINAS CON IMAGENES QUE NO FUNCIONAN */
    const e = detail2.filter(e => !e.image_link.includes("purpicks") )
    const e1 = e.filter(e => !e.image_link.includes("static-assets.glossier") )
    const e2 = e1.filter(e => !e.image_link.includes("d3t32hsnjxo7q6.cloudfront.net/") )

        res.send(e2);
    } catch (error) {
        next(error);
    }
}
module.exports = {
    getDetailProduct
};
