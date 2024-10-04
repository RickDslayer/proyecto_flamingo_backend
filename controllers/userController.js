const controller = {};

// Listar todos los usuarios (GET)
controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.status(500).json({ error: 'Error de conexión a la base de datos', details: err });

    conn.query('SELECT * FROM user WHERE active = TRUE', (err, users) => {
      if (err) return res.status(500).json({ error: 'Error al obtener los usuarios', details: err });
      res.json(users);  // Enviar los usuarios como JSON
    });
  });
};

// Guardar un nuevo usuario (POST)
controller.save = (req, res) => {
  const data = req.body;  // Obtener los datos del cuerpo de la solicitud
  req.getConnection((err, conn) => {
    if (err) return res.status(500).json({ error: 'Error de conexión a la base de datos', details: err });

    conn.query('INSERT INTO user SET ?', [data], (err, result) => {
      if (err) return res.status(500).json({ error: 'Error al guardar el usuario', details: err });
      res.json({ message: 'Usuario agregado exitosamente', result });
    });
  });
};

// Eliminar (desactivar) un usuario (DELETE)
controller.delete = (req, res) => {
  const { id } = req.params;  // Obtener el ID de los parámetros de la solicitud
  req.getConnection((err, conn) => {
    if (err) return res.status(500).json({ error: 'Error de conexión a la base de datos', details: err });

    conn.query('UPDATE user SET active = FALSE WHERE id = ?', [id], (err, result) => {
      if (err) return res.status(500).json({ error: 'Error al desactivar el usuario', details: err });
      res.json({ message: 'Usuario desactivado exitosamente', result });
    });
  });
};

// Obtener un usuario para edición (GET)
controller.edit = (req, res) => {
  const { id } = req.params;  // Obtener el ID de los parámetros de la solicitud
  req.getConnection((err, conn) => {
    if (err) return res.status(500).json({ error: 'Error de conexión a la base de datos', details: err });

    conn.query('SELECT * FROM user WHERE id = ?', [id], (err, user) => {
      if (err) return res.status(500).json({ error: 'Error al obtener el usuario', details: err });
      res.json(user[0]);  // Enviar solo el primer usuario
    });
  });
};

// Actualizar un usuario (PUT)
controller.update = (req, res) => {
  const { id } = req.params;  // Obtener el ID de los parámetros de la solicitud
  const newUser = req.body;  // Obtener los datos del cuerpo de la solicitud
  req.getConnection((err, conn) => {
    if (err) return res.status(500).json({ error: 'Error de conexión a la base de datos', details: err });

    conn.query('UPDATE user SET ? WHERE id = ?', [newUser, id], (err, result) => {
      if (err) return res.status(500).json({ error: 'Error al actualizar el usuario', details: err });
      res.json({ message: 'Usuario actualizado exitosamente', result });
    });
  });
};

module.exports = controller;

