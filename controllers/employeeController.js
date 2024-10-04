const controller = {};

// Listar todos los empleados
controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.status(500).json({ error: err });

    conn.query('SELECT * FROM employee', (err, employees) => {
      if (err) return res.status(500).json({ error: err });
      res.json(employees);
    });
  });
};

// Guardar un nuevo empleado
controller.save = (req, res) => {
  const data = req.body;
  req.getConnection((err, conn) => {
    if (err) return res.status(500).json({ error: err });

    conn.query('INSERT INTO employee SET ?', [data], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Empleado agregado', result });
    });
  });
};

// Eliminar empleado
controller.delete = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    if (err) return res.status(500).json({ error: err });

    conn.query('DELETE FROM employee WHERE id = ?', [id], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Empleado eliminado', result });
    });
  });
};

// Editar empleado
controller.edit = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    if (err) return res.status(500).json({ error: err });

    conn.query('SELECT * FROM employee WHERE id = ?', [id], (err, employee) => {
      if (err) return res.status(500).json({ error: err });
      res.json(employee[0]);
    });
  });
};

// Actualizar empleado
controller.update = (req, res) => {
  const { id } = req.params;
  const newEmployee = req.body;
  req.getConnection((err, conn) => {
    if (err) return res.status(500).json({ error: err });

    conn.query('UPDATE employee SET ? WHERE id = ?', [newEmployee, id], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Empleado actualizado', result });
    });
  });
};

module.exports = controller;
