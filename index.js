const express = require('express');
const app = express();
const myConnection = require('express-myconnection');
const mysql = require('mysql');

// Configurar la conexión a MySQL antes de las rutas
app.use(myConnection(mysql, {
    host: 'bv0vmjalxwbecty79irj-mysql.services.clever-cloud.com',
    user: 'unu3mt6mgrytddqb',
    password: 'czTEYuZvRuwvMlSoQCFm',
    port: 3306,
    database: 'bv0vmjalxwbecty79irj'
}, 'single'));

// Middleware para manejar JSON
app.use(express.json());


// Configura las rutas después de la conexión
const routes = require('./routes/allRoutes');
app.use('/', routes);

// Configurar el puerto y lanzar el servidor
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});
