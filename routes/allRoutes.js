const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController');
const userController = require('../controllers/userController');
const registerController = require('../controllers/registerController');
const adminController = require('../controllers/adminController');
const testController = require('../controllers/testController');
const busController = require('../controllers/busController');
const terminalController = require('../controllers/terminalController');
const tripController = require('../controllers/tripController');
const clientController = require('../controllers/clientController');

router.get('/', loginController.load);

//users
router.get('/admin_user', userController.list);
router.post('/addUser', userController.save);
router.get('/deleteUser/:id', userController.delete);
router.get('/editUser/:id', userController.edit);
router.post('/updateUser/:id', userController.update);
router.get('/searchUser/:id', userController.search);

//admin
router.get('/admin', adminController.load);//

//login
router.get('/login', loginController.load);//
router.post('/logeo', loginController.login);

//register
router.get('/register', registerController.load);//
router.post('/register', registerController.storeUser);

//test
router.get('/test', testController.load);//

//bus
router.get('/admin_bus', busController.list);
router.post('/addBus', busController.save);
router.get('/deleteBus/:id', busController.delete);
router.get('/editBus/:id', busController.edit);
router.post('/updateBus/:id', busController.update);

//terminal
router.get('/admin_terminal', terminalController.list);
router.post('/addTerminal', terminalController.save);
router.get('/deleteTerminal/:id', terminalController.delete);
router.get('/editTerminal/:id', terminalController.edit);
router.post('/updateTerminal/:id', terminalController.update);

//trip
router.get('/admin_viajes', tripController.list);
router.post('/addViajes', tripController.save);
router.get('/deleteViajes/:id', tripController.delete);
router.get('/editViajes/:id', tripController.edit);
router.post('/updateViajes/:id', tripController.update);

//client
router.get('/client', clientController.list);
router.get('/searchClient', clientController.search);

module.exports = router;