const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController');
const userController = require('../controllers/userController');
const registerController = require('../controllers/registerController');
const employeeController = require('../controllers/employeeController');
const testController = require('../controllers/testController');
const busController = require('../controllers/busController');
const terminalController = require('../controllers/terminalController');
const tripController = require('../controllers/tripController');
const clientController = require('../controllers/clientController');
const ticketController = require('../controllers/ticketController')

//users
router.get('/list_user', userController.list);           // Listar usuarios (GET)
router.post('/save_user', userController.save);          // Guardar nuevo usuario (POST)
router.delete('/delete_user:id', userController.delete);   // Eliminar (desactivar) usuario (DELETE)
router.get('/edit_user:id', userController.edit);        // Obtener un usuario (GET)
router.put('/update_user:id', userController.update);  
router.put('/update_role:mail', userController.updateRole);

//employee
router.get('/list_employee', employeeController.list);
router.post('/save_employee', employeeController.save);
router.delete('/delete_employee:id', employeeController.delete);
router.get('/edit_employee:id', employeeController.edit);
router.put('/update_employee:id', employeeController.update);

//ticket
router.get('/list_ticket', ticketController.list);
router.post('/save_ticket', ticketController.save);
router.delete('/delete_ticket:id', ticketController.delete);
router.get('/edit_ticket:id', ticketController.edit);
router.put('/update_ticket:id', ticketController.update);

//login
router.post('/logeo', loginController.login);

//register
router.post('/register', registerController.storeUser);

//bus
router.get('/list_bus', busController.list);
router.post('/save_bus', busController.save);
router.delete('/delete_bus:id', busController.delete);
router.get('/edit_bus:id', busController.edit);
router.put('/update_bus:id', busController.update);

//terminal
router.get('/list_terminal', terminalController.list);
router.post('/save_terminal', terminalController.save);
router.delete('/delete_terminal:id', terminalController.delete);
router.get('/edit_terminal:id', terminalController.edit);
router.put('/update_terminal:id', terminalController.update);

//trip
router.get('/list_trip', tripController.list);
router.post('/save_trip', tripController.save);
router.delete('/delete_trip:id', tripController.delete);
router.get('/edit_trip:id', tripController.edit);
router.put('/update_trip:id', tripController.update);

//client
router.get('/list_client', clientController.list);
router.post('/save_client', clientController.save);
router.delete('/delete_client:id', clientController.delete);
router.get('/edit_client:id', clientController.edit);
router.put('/update_client:id', clientController.update);

module.exports = router;