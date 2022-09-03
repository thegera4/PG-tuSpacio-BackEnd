const sequelize = require("sequelize");
const { User, Rol, Categorie } = require("../../db.js")

/* INSERT USER IN DB */
const getLogin = async (req, res, next) => {
    const rol = "user";
    const status = false;
    try {
        const newUser = await User.findOrCreate({
            where: { 
                name: req.oidc.user.name, 
                nickname: req.oidc.user.nickname, 
                email: req.oidc.user.email, 
                email_verified: req.oidc.user.email_verified, 
                sid: req.oidc.user.sid, 
                picture: req.oidc.user.picture,
                status,                
            },
        });
        const role_id = await Rol.findAll({
            where: { rolName: rol },
        });
        // newUser.addRol(role_id);
        res.status(200).json({
            succMsg: role_id,
        });

    } catch (error) {
        res.send({ error: error.message })
    }



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


