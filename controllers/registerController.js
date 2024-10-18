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
                // Insertar el nuevo usuario en la tabla user
                conn.query('INSERT INTO user SET ?', [data], (err, result) => {
                    if (err) {
                        console.error('Error al insertar el usuario:', err);
                        return res.status(500).json('Error interno del servidor');
                    }

                    const newUserId = result.insertId; // Obtener el ID del usuario recién creado

                    // Si el rol es 'client', crear una entrada en la tabla client
                    if (data.role === 'client') {
                        const clientData = {
                            user_id: newUserId, // Relacionar con el id del nuevo usuario
                            // Agregar más campos de client si es necesario
                        };

                        conn.query('INSERT INTO client SET ?', [clientData], (err, clientResult) => {
                            if (err) {
                                console.error('Error al insertar el cliente:', err);
                                return res.status(500).json('Error interno del servidor');
                            }

                            return res.status(201).json({
                                message: 'Usuario y cliente registrados exitosamente',
                                user: { id: newUserId, mail: data.mail, role: data.role },
                                client: { id: clientResult.insertId, user_id: newUserId }
                            });
                        });
                    } else {
                        return res.status(201).json({
                            message: 'Usuario registrado exitosamente',
                            user: { id: newUserId, mail: data.mail, role: data.role }
                        });
                    }
                });
            }
        });
    });
};

module.exports = controller;
