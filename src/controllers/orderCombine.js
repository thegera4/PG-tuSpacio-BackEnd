const { Product } = require("../db");
const axios = require("axios")
const { URL_API } = require("./globalConst")

/* GET ONE CATEGORY FROM JSON */
const getOneCategorie = async (category) => {
    const resp = await axios.get(URL_API)
    const dataApi = resp.data
    try {
        let resultCategory = dataApi.filter(e => e.category === category)
        return resultCategory;
    } catch (error) {
        next(error);
    }
}
/* GET ONE BRAND FROM JSON */
const getOneBrand = async (brand) => {
    const resp = await axios.get(URL_API)
    const dataApi = resp.data
    try {
        let resultCategory = dataApi.filter(e => e.brand === brand)
        return resultCategory;
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

/*COMBINATIONS OF QUERYS*/
const orderCombine = async (req, res, next) => {
    const { alpha , category, price, brand } = req.query; 
 try {
    if(price && !alpha && !category && !brand){
        const resp = await axios.get(URL_API)
        const dataApi = resp.data
        let result = await orderPrice(dataApi, price)
        res.send(result)
    }
    if(alpha && !price && !category && !brand){
        const resp = await axios.get(URL_API)
        const dataApi = resp.data
        let result = await orderName(dataApi, alpha)
        res.send(result)
    }
    if(category && !alpha && !price && !brand){
        let result = await getOneCategorie(category)
        res.json(result)
    }
    if(brand && !alpha && !price && !category){
        let result = await getOneBrand(brand)
        res.json(result)
    }
    if (alpha && category && !brand && !price) {
        const categorie = await getOneCategorie(category)
        const nameOrder = await orderName(categorie, alpha)
        res.send(nameOrder)
    } 
    if (price && category && !brand && !alpha) {
        const categorie = await getOneCategorie(category)
        const priceOrder = await orderPrice(categorie, price)
        res.send(priceOrder)
    }
    if (brand && price && !category && !alpha) {
        const brand1 = await getOneBrand(brand)
        const priceOrder = await orderPrice(brand1, price)
        res.send(priceOrder)
    }
    if (brand && alpha && !category && !price) {
        const brand1 = await getOneBrand(brand)
        const nameOrder = await orderName(brand1, alpha)
        res.send(nameOrder)
    }
    if (category && brand && !price && !alpha) {
        const categorie = await getOneCategorie(category)
        const brandFilter = categorie.filter(e => e.brand === brand)
        res.send(brandFilter)
    }

    if (category && brand && price) {      
        const categorie = await getOneCategorie(category)
        const data = categorie.filter(e => e.brand === brand)
        const datafiltered= await orderPrice(data, price)    
        res.send(datafiltered)
    }
    if (category && brand && alpha) {
        const categorie = await getOneCategorie(category)
        const brandFilter = categorie.filter(e => e.brand === brand)
        const nameOrder = await orderName(brandFilter, alpha)
        res.send(nameOrder)
    }
}

catch (error) {
  console.log(error)
}
}

module.exports = {
    orderCombine
};