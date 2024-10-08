const controller = {};

// Listar todos los viajes
controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.status(500).json({ error: err });

    conn.query('SELECT * FROM trip', (err, trips) => {
      if (err) return res.status(500).json({ error: err });
      res.json(trips);
    });
  });
};

// Guardar un nuevo viaje
controller.save = (req, res) => {
  const data = req.body;
  req.getConnection((err, conn) => {
    if (err) return res.status(500).json({ error: err });

    conn.query('INSERT INTO trip SET ?', [data], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Viaje agregado', result });
    });
  });
};

// Eliminar viaje
controller.delete = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    if (err) return res.status(500).json({ error: err });

    conn.query('DELETE FROM trip WHERE id = ?', [id], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Viaje eliminado', result });
    });
  });
};

// Editar viaje
controller.edit = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    if (err) return res.status(500).json({ error: err });

    conn.query('SELECT * FROM trip WHERE id = ?', [id], (err, trip) => {
      if (err) return res.status(500).json({ error: err });
      res.json(trip[0]);
    });
  });
};

// Actualizar viaje
controller.update = (req, res) => {
  const { id } = req.params;
  const newTrip = req.body;
  req.getConnection((err, conn) => {
    if (err) return res.status(500).json({ error: err });

    conn.query('UPDATE trip SET ? WHERE id = ?', [newTrip, id], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Viaje actualizado', result });
    });
  });
};

module.exports = controller;

