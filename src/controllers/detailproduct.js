const { Product, Categorie } = require("../db");
const axios = require("axios")
const { URL_API } = require("./globalConst")


/* GET DETAIL PRODUCT FROM JSON */
const getDetailProduct = async (req, res, next) => {
    const id = req.params.id;
    try { 
        const id = req.params.id;
    
        const dbInfo = await Product.findAll({
            include: {
                model: Categorie,
                attributes: ["name"], 
                through: { attributes: [] }
            }
        })
    
        let productDetail = await dbInfo.find(p => p.id === id)
    
      
            res.send(productDetail);
        } catch (error) {
            next(error);
        }
    }

module.exports = {
    getDetailProduct
};
