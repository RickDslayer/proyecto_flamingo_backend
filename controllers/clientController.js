const userTripController = {};

// Función para obtener y mostrar los viajes disponibles al cliente
userTripController.list = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);

        // Consultar viajes disponibles desde la base de datos
        conn.query('SELECT trip.*, terminal_origin.name AS origin_name, terminal_destination.name AS destination_name, bus.plate AS bus_plate FROM trip INNER JOIN terminal AS terminal_origin ON trip.origin = terminal_origin.id INNER JOIN terminal AS terminal_destination ON trip.destination = terminal_destination.id INNER JOIN bus ON trip.bus_id = bus.id WHERE trip.active = TRUE', (err, trips) => {
            if (err) return res.status(500).send(err);

            // Renderizar la vista con los datos de los viajes
            res.render('client', { trips: trips });
        });
    });
};

userTripController.search = (req, res) => {
    const {code} = req.query;

    req.getConnection((err, conn => {
        if(err) return res.status(500).send(err);
        conn.query('SELECT * FROM trip WHERE code= ?',[code], (err, trip) => {
            res.render('client',{
                data: trip
            })
        });
    }));
}

module.exports = userTripController;
