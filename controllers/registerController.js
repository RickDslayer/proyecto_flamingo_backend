const controller = {};

controller.storeUser = (req, res) => {
    const data = req.body;

    // Si el role no es proporcionado, asignar 'client' por defecto
    if (!data.role) {
        data.role = 'client';
    }

    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error al establecer la conexión:', err);
            return res.status(500).json('Error interno del servidor');
        }

        // Verificar si el correo ya está registrado
        conn.query('SELECT * FROM user WHERE mail = ?', [data.mail], (err, userdata) => {
            if (err) {
                console.error('Error al ejecutar la consulta:', err);
                return res.status(500).json('Error interno del servidor');
            }

            if (userdata.length > 0) {
                return res.status(400).json('El usuario ya existe');
            } else {
                // Insertar el nuevo usuario en la base de datos
                conn.query('INSERT INTO user SET ?', [data], (err, user) => {
                    if (err) {
                        console.error('Error al insertar el usuario:', err);
                        return res.status(500).json('Error interno del servidor');
                    }

                    return res.status(201).json({
                        message: 'Usuario registrado exitosamente',
                        user: { id: user.insertId, mail: data.mail, role: data.role }
                    });
                });
            }
        });
    });
};

module.exports = controller;