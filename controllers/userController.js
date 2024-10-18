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

// Cambiar el rol de un usuario (PUT)
controller.updateRole = (req, res) => {
  const { mail, newRole } = req.body;

  if (newRole !== 'employee') {
    return res.status(400).json('El nuevo rol debe ser empleado');
  }

  req.getConnection((err, conn) => {
    if (err) {
      console.error('Error al establecer la conexión:', err);
      return res.status(500).json('Error interno del servidor');
    }

    // Buscar al usuario por su correo
    conn.query('SELECT * FROM user WHERE mail = ?', [mail], (err, userdata) => {
      if (err) {
        console.error('Error al ejecutar la consulta:', err);
        return res.status(500).json('Error interno del servidor');
      }

      if (userdata.length === 0) {
        return res.status(404).json('Usuario no encontrado');
      }

      const user = userdata[0];

      // Verificar si el usuario ya es empleado
      if (user.role === 'employee') {
        return res.status(400).json('El usuario ya es empleado');
      }

      // Actualizar el role del usuario a 'employee'
      conn.query('UPDATE user SET role = ? WHERE id = ?', ['employee', user.id], (err, result) => {
        if (err) {
          console.error('Error al actualizar el rol del usuario:', err);
          return res.status(500).json('Error interno del servidor');
        }

        // Eliminar la relación del cliente en la tabla client
        conn.query('DELETE FROM client WHERE user_id = ?', [user.id], (err, result) => {
          if (err) {
            console.error('Error al eliminar el cliente:', err);
            return res.status(500).json('Error interno del servidor');
          }

          // Insertar la nueva relación en la tabla employee
          const employeeData = { user_id: user.id };

          conn.query('INSERT INTO employee SET ?', [employeeData], (err, result) => {
            if (err) {
              console.error('Error al insertar el empleado:', err);
              return res.status(500).json('Error interno del servidor');
            }

            return res.status(200).json({
              message: 'Usuario actualizado a empleado exitosamente',
              user: { id: user.id, mail: user.mail, role: 'employee' },
              employee: { id: result.insertId }
            });
          });
        });
      });
    });
  });
};

module.exports = controller;

