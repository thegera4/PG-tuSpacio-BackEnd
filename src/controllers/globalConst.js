/**
 * UTILIZADO PARA UTILIZAR LAS URLS COMO VARIABLES GENERICAS
 */

     let CATEGORY = "cat140006"

const URL_PRODUCTS = {
    method: 'GET',
    url: 'https://sephora.p.rapidapi.com/products/list',
    params: { categoryId: CATEGORY,pageSize: '1', currentPage: '1'  }, 
    headers: {
        'X-RapidAPI-Key': 'c3294b81b9mshd1261f116800681p1989adjsn9d08f1394820',
        'X-RapidAPI-Host': 'sephora.p.rapidapi.com'
    }
}; 



const URL_CATEGORY = {
    method: 'GET',
    url: 'https://sephora.p.rapidapi.com/categories/v2/list-root',
    headers: {
        'X-RapidAPI-Key': 'c3294b81b9mshd1261f116800681p1989adjsn9d08f1394820',
        'X-RapidAPI-Host': 'sephora.p.rapidapi.com'
    }
}

module.exports = {
    URL_PRODUCTS,
    URL_CATEGORY
}