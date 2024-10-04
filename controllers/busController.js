const controller = {};

// Lista los buses y los conductores
controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);

        const getBuses = new Promise((resolve, reject) => {
            const query = `
                SELECT bus.*, user.name AS conductor_nombre 
                FROM bus 
                LEFT JOIN user ON bus.user_id = user.id 
                WHERE bus.active = TRUE`;
            conn.query(query, (err, buses) => {
                if (err) {
                    console.log('Error al obtener los buses:', err);
                    reject(err);
                } else {
                    console.log('Buses obtenidos:', buses);
                    resolve(buses);
                }
            });
        });

        const getConductores = new Promise((resolve, reject) => {
            conn.query('SELECT id, name FROM user WHERE rol = "conductor"', (err, conductores) => {
                if (err) {
                    console.log('Error al obtener los conductores:', err);
                    reject(err);
                } else {
                    console.log('Conductores obtenidos:', conductores);
                    resolve(conductores);
                }
            });
        });

        Promise.all([getBuses, getConductores])
            .then(([buses, conductores]) => {
                res.render('admin_bus', {
                    data: buses,
                    conductores: conductores
                });
            })
            .catch(err => {
                res.status(500).send(err);
            });
    });
};

// Guarda un nuevo bus
controller.save = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);
        conn.query('INSERT INTO bus SET ?', [data], (err, bus) => {
            if (err) return res.status(500).send(err);
            res.redirect('/admin_bus');
        });
    });
};

// Elimina (desactiva) un bus
controller.delete = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);
        conn.query('UPDATE bus SET active = FALSE WHERE id = ?', [id], (err, rows) => {
            if (err) return res.status(500).send(err);
            res.redirect('/admin_bus');
        });
    });
};

// Edita un bus
controller.edit = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        const getBus = new Promise((resolve, reject) => {
            conn.query('SELECT * FROM bus WHERE id = ?', [id], (err, bus) => {
                if (err) reject(err);
                resolve(bus[0]);
            });
        });

        const getConductores = new Promise((resolve, reject) => {
            conn.query('SELECT id, name FROM user WHERE rol = "conductor"', (err, conductores) => {
                if (err) reject(err);
                resolve(conductores);
            });
        });

        Promise.all([getBus, getConductores])
            .then(([bus, conductores]) => {
                res.render('admin_busEdit', {
                    data: bus,
                    conductores: conductores
                });
            })
            .catch(err => {
                res.status(500).send(err);
            });
    });
};

// Actualiza un bus
controller.update = (req, res) => {
    const { id } = req.params;
    const newBus = req.body;
    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);
        conn.query('UPDATE bus SET ? WHERE id = ?', [newBus, id], (err, bus) => {
            if (err) return res.status(500).send(err);
            res.redirect('/admin_bus');
        });
    });
};

module.exports = controller;
