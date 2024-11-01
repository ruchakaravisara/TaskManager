const express = require('express');
const { registerUser, loginUser } = require('../Controllers/AuthController'); // Ensure this path is correct
const router = express.Router();

router.post('/register', registerUser); // registerUser should be a defined function
router.post('/login', loginUser); // loginUser should also be defined

module.exports = router;
