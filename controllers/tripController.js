const tripController = {};

// Listar viajes
tripController.list = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);

        const getTrips = new Promise((resolve, reject) => {
            const query = `
                SELECT trip.*, bus.plate AS bus_plate, origin.name AS origin_name, destination.name AS destination_name 
                FROM trip 
                LEFT JOIN bus ON trip.bus_id = bus.id 
                LEFT JOIN terminal AS origin ON trip.origin = origin.id 
                LEFT JOIN terminal AS destination ON trip.destination = destination.id 
                WHERE trip.active = TRUE`;
            conn.query(query, (err, trips) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(trips);
                }
            });
        });

        const getBuses = new Promise((resolve, reject) => {
            conn.query('SELECT id, plate FROM bus WHERE active = TRUE', (err, buses) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(buses);
                }
            });
        });

        const getTerminals = new Promise((resolve, reject) => {
            conn.query('SELECT id, name FROM terminal WHERE active = TRUE', (err, terminals) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(terminals);
                }
            });
        });

        Promise.all([getTrips, getBuses, getTerminals])
            .then(([trips, buses, terminals]) => {
                res.render('admin_viajes', {
                    data: trips,
                    buses: buses,
                    terminals: terminals
                });
            })
            .catch(err => {
                res.status(500).send(err);
            });
    });
};

// Guardar nuevo viaje
tripController.save = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);
        conn.query('INSERT INTO trip SET ?', [{
            code: data.code,
            departing_time: data.departing_time,
            arrival_time: data.arrival_time,
            origin: data.origin_id, // Modificado: Usar 'origin' en lugar de 'origin_id'
            destination: data.destination_id, // Modificado: Usar 'destination' en lugar de 'destination_id'
            estimated_duration: data.estimated_duration,
            bus_id: data.bus_id
        }], (err, trip) => {
            if (err) return res.status(500).send(err);
            res.redirect('/admin_viajes');
        });
    });
};

// Eliminar viaje (desactivar)
tripController.delete = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);
        conn.query('UPDATE trip SET active = FALSE WHERE id = ?', [id], (err, rows) => {
            if (err) return res.status(500).send(err);
            res.redirect('/admin_viajes');
        });
    });
};

// Editar viaje
tripController.edit = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        const getTrip = new Promise((resolve, reject) => {
            conn.query('SELECT * FROM trip WHERE id = ?', [id], (err, trip) => {
                if (err) reject(err);
                resolve(trip[0]);
            });
        });

        const getBuses = new Promise((resolve, reject) => {
            conn.query('SELECT id, plate FROM bus WHERE active = TRUE', (err, buses) => {
                if (err) reject(err);
                resolve(buses);
            });
        });

        const getTerminals = new Promise((resolve, reject) => {
            conn.query('SELECT id, name FROM terminal WHERE active = TRUE', (err, terminals) => {
                if (err) reject(err);
                resolve(terminals);
            });
        });

        Promise.all([getTrip, getBuses, getTerminals])
            .then(([trip, buses, terminals]) => {
                res.render('admin_viajesEdit', {
                    data: trip,
                    buses: buses,
                    terminals: terminals
                });
            })
            .catch(err => {
                res.status(500).send(err);
            });
    });
};

// Actualizar viaje
tripController.update = (req, res) => {
    const { id } = req.params;
    const newTrip = req.body;
    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);
        conn.query('UPDATE trip SET ? WHERE id = ?', [newTrip, id], (err, rows) => {
            if (err) return res.status(500).send(err);
            res.redirect('/admin_viajes');
        });
    });
};

module.exports = tripController;
