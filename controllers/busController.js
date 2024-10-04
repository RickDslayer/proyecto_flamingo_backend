const controller = {};

// Listar todos los buses
controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.status(500).json({ error: err });

    conn.query('SELECT * FROM bus', (err, buses) => {
      if (err) return res.status(500).json({ error: err });
      res.json(buses);
    });
  });
};

// Guardar un nuevo bus
controller.save = (req, res) => {
  const data = req.body;
  req.getConnection((err, conn) => {
    if (err) return res.status(500).json({ error: err });

    conn.query('INSERT INTO bus SET ?', [data], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Bus agregado', result });
    });
  });
};

// Eliminar bus
controller.delete = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    if (err) return res.status(500).json({ error: err });

    conn.query('DELETE FROM bus WHERE id = ?', [id], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Bus eliminado', result });
    });
  });
};

// Editar bus
controller.edit = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    if (err) return res.status(500).json({ error: err });

    conn.query('SELECT * FROM bus WHERE id = ?', [id], (err, bus) => {
      if (err) return res.status(500).json({ error: err });
      res.json(bus[0]);
    });
  });
};

// Actualizar bus
controller.update = (req, res) => {
  const { id } = req.params;
  const newBus = req.body;
  req.getConnection((err, conn) => {
    if (err) return res.status(500).json({ error: err });

    conn.query('UPDATE bus SET ? WHERE id = ?', [newBus, id], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Bus actualizado', result });
    });
  });
};

module.exports = controller;

