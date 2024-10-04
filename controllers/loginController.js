const controller = {};

controller.load = (req,res) => {
    res.render('login');
};

controller.login = async (req, res) => {
    const data = req.body;

    try {
        const conn = await new Promise((resolve, reject) => {
            req.getConnection((err, conn) => {
                if (err) reject(err);
                resolve(conn);
            });
        });

        const userdata = await new Promise((resolve, reject) => {
            conn.query('SELECT * FROM user WHERE mail = ?', [data.mail], (err, userdata) => {
                if (err) reject(err);
                resolve(userdata);
            });
        });

        if (userdata.length > 0) {
            const element = userdata[0]; // Solo tomamos el primer elemento, suponiendo que no hay correos duplicados
            if (data.password === element.password) {
                // Contraseña correcta
                req.session.loggedin = true;
                req.session.name = element.name;
                // Verificar la posición del usuario
                if (element.rol === 'admin') {
                    // Si la posición es admin, redirigir a la página de administrador
                    res.redirect('/admin');
                } else if (element.rol === '') {
                    // Si la posición está vacía, redirigir a la página de cliente
                    res.redirect('/client');
                }
            } else {
                // Contraseña incorrecta
                res.json('contraseña incorrecta');
            }
        } else {
            console.log('Usuario no encontrado');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json('Error interno del servidor');
    }
};

module.exports = controller;