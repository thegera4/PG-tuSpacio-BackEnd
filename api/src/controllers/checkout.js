const { Product, Categorie } = require("../db");
const axios = require("axios");
const { URL_API } = require("./globalConst");
const Stripe = require('stripe');
const stripe = new Stripe("sk_test_51LeNbcEQvh36s53LYwHYaoG7TVj2Pccx0UTBJoQCvyxQAHr1HDcO8WgMA5G5xvryblbXJBBTilQCDTRqILbhRALW00pLAekVxK")

const Checkout = async (req, res) => {
  const { id, amount } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Aqui va la descripcion del producto desde la base de datos",
      payment_method: id,
      confirm: true
    })
    console.log(payment)
    res.send({msg: 'Successful payment'})
    } catch (error) {
      console.error(error)
      res.send({msg: error})
    }
}

module.exports = {
  Checkout
};
