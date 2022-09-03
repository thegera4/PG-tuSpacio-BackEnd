const sequelize = require("sequelize");
const { User, Rol, Categorie } = require("../db");


/* GET DETAIL PRODUCT FROM JSON */
const getLogin = async (req, res, next) => {

    const { nickname, name, picture, email, email_verified, sid } = req.oidc.user;
    // const rol = "user";
    // // const status 
    // const newUser = User.create({
    //     nickname,
    //     name,
    //     picture,
    //     email,
    //     email_verified,
    //     sid,
    //     // status
    // });

    const newRol = await Categorie.findAll()


console.log(newRol);
    // const rolId = await Rol.findOrCreate({
    //     where: { rolName: rol },
    // });
    // newUser.addRol(rolId);

    //   res.status(200).json({
    //     succMsg: "User Created Successfully!",
    //     newUser,
    //   });


    // app.get('/admin',  (req, res) => {
    // res.send(JSON.stringify(req.oidc.user));
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


