const controller = {};

// Listar todas las terminales
controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.status(500).json({ error: err });

    conn.query('SELECT * FROM terminal', (err, terminals) => {
      if (err) return res.status(500).json({ error: err });
      res.json(terminals);
    });
  });
};

// Guardar una nueva terminal
controller.save = (req, res) => {
  const data = req.body;
  req.getConnection((err, conn) => {
    if (err) return res.status(500).json({ error: err });

    conn.query('INSERT INTO terminal SET ?', [data], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Terminal agregada', result });
    });
  });
};

// Eliminar terminal
controller.delete = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    if (err) return res.status(500).json({ error: err });

    conn.query('DELETE FROM terminal WHERE id = ?', [id], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Terminal eliminada', result });
    });
  });
};

// Editar terminal
controller.edit = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    if (err) return res.status(500).json({ error: err });

    conn.query('SELECT * FROM terminal WHERE id = ?', [id], (err, terminal) => {
      if (err) return res.status(500).json({ error: err });
      res.json(terminal[0]);
    });
  });
};

// Actualizar terminal
controller.update = (req, res) => {
  const { id } = req.params;
  const newTerminal = req.body;
  req.getConnection((err, conn) => {
    if (err) return res.status(500).json({ error: err });

    conn.query('UPDATE terminal SET ? WHERE id = ?', [newTerminal, id], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Terminal actualizada', result });
    });
  });
};

module.exports = controller;
