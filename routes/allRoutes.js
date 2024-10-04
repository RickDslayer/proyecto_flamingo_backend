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

router.get('/', loginController.load);

//users
router.get('/', userController.list);           // Listar usuarios (GET)
router.post('/', userController.save);          // Guardar nuevo usuario (POST)
router.delete('/:id', userController.delete);   // Eliminar (desactivar) usuario (DELETE)
router.get('/:id', userController.edit);        // Obtener un usuario (GET)
router.put('/:id', userController.update); 

//employee
router.get('/', employeeController.list);
router.post('/', employeeController.save);
router.delete('/:id', employeeController.delete);
router.get('/:id', employeeController.edit);
router.put('/:id', employeeController.update);

//ticket
router.get('/', ticketController.list);
router.post('/', ticketController.save);
router.delete('/:id', ticketController.delete);
router.get('/:id', ticketController.edit);
router.put('/:id', ticketController.update);

//login
router.post('/logeo', loginController.login);

//register
router.get('/register', registerController.load);//
router.post('/register', registerController.storeUser);

//test
router.get('/test', testController.load);//

//bus
router.get('/', busController.list);
router.post('/', busController.save);
router.delete('/:id', busController.delete);
router.get('/:id', busController.edit);
router.put('/:id', busController.update);

//terminal
router.get('/', terminalController.list);
router.post('/', terminalController.save);
router.delete('/:id', terminalController.delete);
router.get('/:id', terminalController.edit);
router.put('/:id', terminalController.update);

//trip
router.get('/', tripController.list);
router.post('/', tripController.save);
router.delete('/:id', tripController.delete);
router.get('/:id', tripController.edit);
router.put('/:id', tripController.update);

//client
router.get('/client', clientController.list);
router.get('/searchClient', clientController.search);

module.exports = router;