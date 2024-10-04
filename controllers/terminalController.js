const controller = {};


controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM terminal WHERE active = TRUE', (err, users) => {
            if(err){
                res.json(err);
            }
            console.log(users);
            res.render('admin_terminal', {
                data: users
            });
        });
    });
};

controller.save = (req, res) => {

    const data = req.body;

    req.getConnection((err, conn) => {
        console.log('ok');
        conn.query('INSERT INTO terminal set ?', [data], (err, user) => {
            console.log(err);
            res.redirect('admin_terminal');
        });
    })
}

controller.delete = (req,res) => {

const {id} = req.params;

    req.getConnection((err, conn) => {
        if (err) {
            // Manejar el error si la conexión falla
            console.log(err);
            return res.status(500).send('Error interno del servidor');
        }
        conn.query('UPDATE terminal SET active = FALSE WHERE id = ?', [id], (err, rows) => {
            if (err) {
                // Manejar el error si la eliminación falla
                console.log(err);
                return res.status(500).send('Error interno del servidor');
            }
            // Redirigir a la página principal de administración de usuarios después de la eliminación
            res.redirect('/admin_terminal');
        });
    })
};

controller.edit = (req,res) => {

    const {id} = req.params;

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM terminal WHERE id= ?', [id], (err, user) => {
            res.render('admin_terminalEdit', {
                data: user[0]
            })
        });
    });
};

controller.update = (req,res) => {
    
    const {id} = req.params;
    const newUser = req.body;

    req.getConnection((err, conn) => {
        conn.query('UPDATE terminal set ? WHERE id = ?', [newUser, id], (err, user) => {
            res.redirect('/admin_terminal')
        });
    });
};

module.exports = controller;