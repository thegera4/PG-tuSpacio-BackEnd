const server = require('../api/src/app');
const { database } = require('../api/src/db.js');
// const { uploadCategoryDb } = require('./src/controllers/uploadCategoryDb');
require("dotenv").config(); //para leer las variables de entorno

const PORT = process.env.PORT || 3001;

// Syncing all the models at once.
//Con {force:true} ==>es un sincronizado forzado por lo que se reescribe la Bd al recargar la app

database.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log(`Server Listening in http://localhost:${PORT}/`);
  });
});


