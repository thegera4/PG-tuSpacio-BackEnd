const { Product } = require("../db");
const axios = require("axios")
const { URL_API } = require("./globalConst")


/* GET ONE CATEGORY FROM JSON */
const getRatingProduct = async (req, res, next) => {
    const {ratingMax, ratingMin}  = req.query;

    const resp = await axios.get(URL_API)
    const dataApi = resp.data
    try {
            let resultCategory = dataApi.filter(e => e.rating>= ratingMin && e.rating <= ratingMax);
            res.send(resultCategory);
        } catch (error) {
                next(error);
            }
}
module.exports = {
    getRatingProduct
};