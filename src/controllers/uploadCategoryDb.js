const axios = require("axios")
const { Categorie } = require("../db");
const { URL_CATEGORY } = require("./globalConst")

/** LOADING OF CATEGORIES IN THE DB */
async function uploadCategoryDb () {
    const apiCategory = await axios(URL_CATEGORY)
    let data = apiCategory.data.rootCategories.map(e=> e.displayName)
    let category = (data)
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