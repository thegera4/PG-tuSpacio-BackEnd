const { Rol } = require('../db.js')

// BUSQUEDA DE TODOS LOS ROLES
const getAllRoles = async (req, res, next) => {
    try {
        const getAllRoles = await Rol.findAll()
        res.send(getAllRoles)
    } catch (error) {
        next({ message: error.message })
    }

}
// CREACION DEL ROL
const createRol = async (req, res, next) => {
    const { rolName, status } = req.query
    try {
        const newRol = await Rol.create({
            rolName: rolName,
            status: status
        })
        res.send(newRol)
    } catch (error) {
        next({ message: error.message })
    }
}

// MODIFICACION DEL ROL REVISAR
const updateRol = async (req, res, next) => {
    const { rolNamePrevious, rolNameNew, status } = req.query
    try {
        const rolId = await Rol.findAll({
            attributes: ["id"],
            where: {
                rolName: rolNamePrevious
            }
        })
        const id = rolId.map(e => e.id)
        const rol = await Rol.update({ rolName: rolNameNew, status: status }, {
            where: {
                id: id
            }
        })
        res.send(rol)
    } catch (error) {
        next({ message: error.message })
    }
}

// ELIMINACION DEL ROL
const deleteRol = async (req, res, next) => {
    const { rolName } = req.query
    try {
        const rolId = await Rol.findAll({
            attributes: ["id"],
            where: {
                rolName: rolName
            }
        })
        const id = rolId.map(e => e.id)
        const rol = await Rol.destroy({
            where: {
                id: id
            }
        });
        res.send(rol)
    } catch (error) {
        next({ message: error.message })
    }
}


module.exports = {
    getAllRoles,
    createRol,
    updateRol,
    deleteRol
}