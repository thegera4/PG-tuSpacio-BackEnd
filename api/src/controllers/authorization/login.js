// const { requiresAuth } = require('express-openid-connect');
const { User } = require("../db");

/* GET DETAIL PRODUCT FROM JSON */
const getLogin = async (req, res, next) => { 
    
    // const {nickname, name, picture, email, email_verified, sid} = req.oidc.user;
    // app.get('/admin',  (req, res) => {
        res.send(JSON.stringify(req.oidc.user));
        // console.log(email_verified)
    //   });
    // res.send("estoy en getLogin")
    // res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
//       app.get('/profile', requiresAuth(), (req, res) => {
//   res.send(JSON.stringify(req.oidc.user));
// });
}



        
        module.exports = {
            getLogin
        };


