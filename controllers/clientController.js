const controller = {};

// Listar todos los clientes
controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.status(500).json({ error: err });

    conn.query('SELECT * FROM client', (err, clients) => {
      if (err) return res.status(500).json({ error: err });
      res.json(clients);
    });
  });
};

// Guardar un nuevo cliente
controller.save = (req, res) => {
  const data = req.body;
  req.getConnection((err, conn) => {
    if (err) return res.status(500).json({ error: err });

    conn.query('INSERT INTO client SET ?', [data], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Cliente agregado', result });
    });
  });
};

// Eliminar cliente
controller.delete = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    if (err) return res.status(500).json({ error: err });

    conn.query('DELETE FROM client WHERE id = ?', [id], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Cliente eliminado', result });
    });
  });
};

// Editar cliente
controller.edit = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    if (err) return res.status(500).json({ error: err });

    conn.query('SELECT * FROM client WHERE id = ?', [id], (err, client) => {
      if (err) return res.status(500).json({ error: err });
      res.json(client[0]);
    });
  });
};

// Actualizar cliente
controller.update = (req, res) => {
  const { id } = req.params;
  const newClient = req.body;
  req.getConnection((err, conn) => {
    if (err) return res.status(500).json({ error: err });

    conn.query('UPDATE client SET ? WHERE id = ?', [newClient, id], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Cliente actualizado', result });
    });
  });
};

module.exports = controller;

