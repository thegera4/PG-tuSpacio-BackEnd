const { Product } = require("../db");

getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({msg: 'something went wrong' + error});
  }
}

module.exports = { getAllProducts };