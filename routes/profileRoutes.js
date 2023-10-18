const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router
    .put('/:id',profileController.updateProfile)
    .post('/',profileController.addProfile)
    .get('/',profileController.getProfiles);

module.exports = router;