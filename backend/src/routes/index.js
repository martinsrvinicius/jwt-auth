const express = require('express');
const router = express.Router();
const path = require('path');
const dotenv = require('dotenv').config({ path: path.resolve(__dirname, `../../.env.${process.env.NODE_ENV}`) })
const auth = require("./auth");// authentication routes

const authenticate = require('../middleware/authenticate');


router.use("/auth", auth);
router.use(authenticate);


module.exports = router;
