const { Product } = require("../db");
const axios = require("axios")
const { URL_API } = require("./globalConst")

/* GET ONE CATEGORY FROM JSON */
const getOneCategorie = async (category) => {
    const resp = await axios.get(URL_API)
    const dataApi = resp.data
    try {
        let resultCategory = dataApi.filter(e => e.category === category)
        return resultCategory 
        } catch (error) {
        next(error);
    }
}
/* GET ONE BRAND FROM JSON */
const getOneBrand = async (brand) => {
    const resp = await axios.get(URL_API)
    const dataApi = resp.data
    try {
        let resultBrand = dataApi.filter(e => e.brand === brand)
        return resultBrand
    } catch (error) {
        next(error);
    }
}
/* ORDER BY PRICE */
const orderPrice =async (data, price) => {
    if (price === "asc"){     
        let result = data.sort((a, b) => {
            return a.price - b.price
        })
        return result
    }
    if (price === "desc") {
        let result = data.sort((a, b) => {
            return b.price - a.price
        })
        return result
    }
}
/* ORDER BY NAME */
const orderName = async (data, alpha) => {
    if (alpha === "asc") {
        let result = data.sort((a, b) => {
            if (a.name?.toLowerCase() > b.name?.toLowerCase()) {
                return 1}
            if (a.name?.toLowerCase() < b.name?.toLowerCase()) {
                return -1}
            return 0;
        })
        return result
    }
    if (alpha === "desc") {
        let result = data.sort((a, b) => {
            if (a.name?.toLowerCase() < b.name?.toLowerCase()) {
                return 1}
            if (a.name?.toLowerCase() > b.name?.toLowerCase()) {
                return -1}
            return 0;
        })
        return result
    }
}

/* ORDER BY RATING */
const orderRating = async (data, rating) => {
    if (rating === "asc"){     
        let result = data.sort((a, b) => {
            return a.rating - b.rating
        })
        return result
    }
    if (rating === "desc") {
        let result = data.sort((a, b) => {
            return b.rating - a.rating
        })
        return result
    }
}
/*COMBINATIONS OF QUERYS*/
const orderCombine = async (req, res, next) => {
    const { alpha , category, price, brand, rating } = req.query; 
 try {
    /* ORDER BY CATEGORY AND/OR BRAND */
    if(category){
        let result = await getOneCategorie(category)
        if(brand) {
            result = result.filter(e => e.brand === brand)}
        if(alpha) {
            result = await orderName(result, alpha)}
        if(price) {
            result = await orderPrice(result, price)}
        if(rating) {
            result = await orderRating(result, rating)}
        res.send(result)
            }
    /* ORDER BY BRAND AND/OR CATEGORY */
    else if(brand){
        let result = await getOneBrand(brand)
        if(category) {
            result = result.filter(e => e.category === category)}
        if(alpha) {
            result = await orderName(result, alpha)}
        if(price) {
            result = await orderPrice(result, price)}
        if(rating) {
            result = await orderRating(result, rating)}
        res.send(result)
            }
    }
      catch (error) {
        console.log(error)    
       msg: "no se pudo realizar la consulta"
    }
}