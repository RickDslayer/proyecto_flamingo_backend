const controller = {};

// Listar todos los tickets
controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.status(500).json({ error: err });

    conn.query('SELECT * FROM ticket', (err, tickets) => {
      if (err) return res.status(500).json({ error: err });
      res.json(tickets);
    });
  });
};

// Guardar un nuevo ticket
controller.save = (req, res) => {
  const data = req.body;
  req.getConnection((err, conn) => {
    if (err) return res.status(500).json({ error: err });

    conn.query('INSERT INTO ticket SET ?', [data], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Ticket agregado', result });
    });
  });
};

// Eliminar ticket
controller.delete = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    if (err) return res.status(500).json({ error: err });

    conn.query('DELETE FROM ticket WHERE id = ?', [id], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Ticket eliminado', result });
    });
  });
};

// Editar ticket
controller.edit = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    if (err) return res.status(500).json({ error: err });

    conn.query('SELECT * FROM ticket WHERE id = ?', [id], (err, ticket) => {
      if (err) return res.status(500).json({ error: err });
      res.json(ticket[0]);
    });
  });
};

// Actualizar ticket
controller.update = (req, res) => {
  const { id } = req.params;
  const newTicket = req.body;
  req.getConnection((err, conn) => {
    if (err) return res.status(500).json({ error: err });

    conn.query('UPDATE ticket SET ? WHERE id = ?', [newTicket, id], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Ticket actualizado', result });
    });
  });
};

module.exports = controller;
