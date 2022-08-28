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
        res.send(detail2);
    } catch (error) {
        next(error);
    }
}
module.exports = {
    getDetailProduct
};
