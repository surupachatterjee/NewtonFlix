// load the required modules
const express = require('express');
const Request = require("request");
const router = express.Router();
const {check, validationResult } = require('express-validator/check');

// load config details
const OMDBURI = require('../../config/keys_dev').OMDBURI;
const OMDBAPIKEY = require('../../config/keys_dev').OMDBAPIKEY;
const IMDBURI = require('../../config/keys_dev').IMDBURI;

// @route   GET api/movies
// @desc    Test route
// @access  Public
router.get('/', (req, res) => {
  res.send('Movie route reached');
});

// @route   GET api/movies/movie/:movieName
// @desc    Get by movie name
// @access  Public
router.get('/movie/:movieName', ({ params: { movieName } }, res) => {
  console.log(movieName);
  res.send('Specific movie name requested');
});

module.exports = router;