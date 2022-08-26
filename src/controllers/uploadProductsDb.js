const axios = require("axios")
const { Categorie } = require("../db");
const { URL_PRODUCTS } = require("./globalConst")

/** LOADING OF CATEGORIES IN THE DB */
async function uploadCategoryDb () {
    const apiCategory = await axios(URL_PRODUCTS)
    let data = apiCategory.data
    let cat = data.map(e => e.category)
    const setCat = new Set(cat)
    let category = [...setCat]

    const typesEach = category.flat(2);
    typesEach.forEach(e => {
        Categorie.findOrCreate({
        where: { name: e }
      })
        .then("Correctly Inserted")
        .catch(e => e)
    })
}

module.exports = {uploadCategoryDb}