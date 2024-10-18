const controller = {};

controller.login = async (req, res) => {
    const data = req.body;

    try {
        // Establecer la conexión
        const conn = await new Promise((resolve, reject) => {
            req.getConnection((err, conn) => {
                if (err) reject(err);
                resolve(conn);
            });
        });

        // Verificar si el usuario existe por su correo
        const userdata = await new Promise((resolve, reject) => {
            conn.query('SELECT * FROM user WHERE mail = ?', [data.mail], (err, userdata) => {
                if (err) reject(err);
                resolve(userdata);
            });
        });

        // Si el usuario existe
        if (userdata.length > 0) {
            const user = userdata[0];

            // Verificar la contraseña
            if (data.password === user.password) {
                // Contraseña correcta, verificar el role
                req.session.loggedin = true;
                req.session.name = user.name;

                if (user.role === 'employee') {
                    // Si es empleado, comprobar si es administrador o conductor
                    return res.status(200).json({
                        message: 'Login exitoso',
                        role: 'employee',
                        user: { id: user.id, name: user.name, position: user.position }
                    });
                } else {
                    // Si es cliente
                    return res.status(200).json({
                        message: 'Login exitoso',
                        role: 'client',
                        user: { id: user.id, name: user.name }
                    });
                }
            } else {
                // Contraseña incorrecta
                return res.status(401).json('Contraseña incorrecta');
            }
        } else {
            // Usuario no encontrado
            return res.status(404).json('Usuario no encontrado');
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json('Error interno del servidor');
    }
};

module.exports = controller;
