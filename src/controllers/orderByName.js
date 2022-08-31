const { Product } = require("../db");
const axios = require("axios")
const { URL_API } = require("./globalConst")


/* ORDERING BY NAME  */
const orderProductsName = async (req, res, next) => {
    const { orderby } = req.query;

    const resp = await axios.get(URL_API)
    const dataApi = resp.data

    if (orderby === 'z-to-a') {   
        try {
            dataApi.sort((a, b) => {
                if ( a.name  > b.name) return -1;
                if (a.nameA < b.name) return 1;
                return 0
            })
            res.send(dataApi)            
        } catch (error) {
            next(error);
        }              //                    
    } else if (orderby === 'a-to-z') {        
        try {
            dataApi.sort((a, b) => {
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;
                return 0
            })         
            res.send(dataApi)
        } catch (error) {
            next(error);
        }
    }
}
module.exports = {
    orderProductsName
};