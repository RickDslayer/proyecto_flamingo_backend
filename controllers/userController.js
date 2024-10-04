const controller = {};

// Obtener la lista de usuarios activos
controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).json({ error: 'Error en la conexión a la base de datos' });
        }
        conn.query('SELECT * FROM user WHERE active = TRUE', (err, users) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener los usuarios' });
            }
            res.status(200).json(users);
        });
    });
};

// Guardar un nuevo usuario
controller.save = (req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).json({ error: 'Error en la conexión a la base de datos' });
        }
        conn.query('INSERT INTO user SET ?', [data], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al guardar el usuario' });
            }
            res.status(201).json({ message: 'Usuario creado', userId: result.insertId });
        });
    });
};

// Eliminar (desactivar) un usuario por ID
controller.delete = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).json({ error: 'Error en la conexión a la base de datos' });
        }
        conn.query('UPDATE user SET active = FALSE WHERE id = ?', [id], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al desactivar el usuario' });
            }
            res.status(200).json({ message: 'Usuario desactivado' });
        });
    });
};

// Editar un usuario por ID
controller.edit = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).json({ error: 'Error en la conexión a la base de datos' });
        }
        conn.query('SELECT * FROM user WHERE id = ?', [id], (err, user) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener los datos del usuario' });
            }
            if (user.length === 0) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            res.status(200).json(user[0]);
        });
    });
};

// Actualizar un usuario por ID
controller.update = (req, res) => {
    const { id } = req.params;
    const newUser = req.body;

    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).json({ error: 'Error en la conexión a la base de datos' });
        }
        conn.query('UPDATE user SET ? WHERE id = ?', [newUser, id], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al actualizar el usuario' });
            }
            res.status(200).json({ message: 'Usuario actualizado' });
        });
    });
};

// Buscar usuario por nombre
controller.search = (req, res) => {
    const { id } = req.params;  // Obtenemos el ID desde los parámetros de la URL

    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).json({ error: 'Error en la conexión a la base de datos' });
        }
        conn.query('SELECT * FROM user WHERE id = ?', [id], (err, user) => {
            if (err) {
                return res.status(500).json({ error: 'Error al buscar el usuario' });
            }
            if (user.length === 0) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            res.status(200).json(user[0]);  // Devolvemos el primer (y único) resultado
        });
    });
};

module.exports = controller;
