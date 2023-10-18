const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router
    .get('/all',userController.getAllUsers)
    .get('/:id',userController.getUser)
    .post('/signup',userController.createUser)
    .delete('/:id',userController.deleteUser)
    .put('/:id',userController.updateUser);
    
module.exports = router;