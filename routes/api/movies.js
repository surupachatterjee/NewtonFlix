// load the required modules
const express = require('express');
const Request = require("request");
const router = express.Router();
const {check, validationResult } = require('express-validator');
const e = require('express');

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
  Request.get(`${OMDBURI}/?apikey=${OMDBAPIKEY}&type=movie&s=${movieName}`, (error, response, body) => {
    console.log(response.statusCode);
    if(error) {
      return console.dir(error);
    }
    else {
      let allmovieDetails = [];
      const moviesFound = JSON.parse(body);
      if (moviesFound.Response === true) {
      moviesFound.Search.map(movieObj => {
        movieObj = {...movieObj, imDBLink: `${IMDBURI}/title/${movieObj.imdbID}`};
        allmovieDetails.push(movieObj);
      }) 
      res.send(allmovieDetails);  
    }
      else {
      res.status(400).send(moviesFound.Error);
    }
  }
  })
  
});

module.exports = router;