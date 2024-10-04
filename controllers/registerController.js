const controller = {};

controller.storeUser = (req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error al establecer la conexión:', err);
            return res.status(500).json('Error interno del servidor');
        }

        conn.query('SELECT * FROM user WHERE mail = ?', [data.mail], (err, userdata) => {
            if (err) {
                console.error('Error al ejecutar la consulta:', err);
                return res.status(500).json('Error interno del servidor');
            }

            if (userdata.length > 0) {
                return res.json('El usuario ya existe');
            } else {
                conn.query('INSERT INTO user SET ?', [data], (err, user) => {
                    if (err) {
                        console.error('Error al insertar el usuario:', err);
                        return res.status(500).json('Error interno del servidor');
                    }

                    res.redirect('/register');
                });
            }
        });
    });
};

controller.load = (req,res) => {
    res.render('register');
};

module.exports = controller;