const { Product, Review } = require("../db");
const axios = require("axios");
const { URL_API } = require("./globalConst");

/* GET ALL REVIEWS OF A PRODUCT */

const getAllReviewsOfAProduct = async (req, res) => {
  const { product_id} = req.params;
  try {
    const dbInfo = await Review.findAll({
      where: { product_id },
    });
    res.send( dbInfo)
  } catch (error) {
    console.log(error);
  }
};
/* GET ONE REVIEW FROM DB */
const getOneReview = async (req, res, next) => {
    const { id } = req.params;
    try {
        const dbInfo = await Review.findOne({
            where: { id },
        });
        res.send( dbInfo)
    } catch (error) {
        console.log(error);
    }
};


/* CREATE NEW REVIEW IN THE DATABASE */
const createReview = async (req, res, next) => {
  try {
    const {
            title, 
            text,
            score,
            product_id,
        } = req.body;
    
    const productDb = await Product.findByPk(product_id);

    const newReview = await Review.create({
        title,
        text,
        score,
        product_id: productDb.id,
    });
 
    res.status(200).json({
      succMsg: "Review Created Successfully!",
      newReview,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
    getAllReviewsOfAProduct,
    getOneReview,
    createReview,   
};
