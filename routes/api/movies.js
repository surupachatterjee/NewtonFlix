// load the required modules
const express = require('express');
const router = express.Router();
const {check, validationResult } = require('express-validator');
const axios = require('axios');


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
  axios.get(`${OMDBURI}/?apikey=${OMDBAPIKEY}&type=movie&s=${movieName}`)
  .then(resp => {
    // console.log(resp);
    // res.send(resp.data);
    let allmovieDetails = [];
    const moviesFound = resp.data;
    console.log(moviesFound);
    if (moviesFound.Response === 'True') {
      moviesFound.Search.map(movieObj => {
        movieObj = {...movieObj, imDBLink: `${IMDBURI}/title/${movieObj.imdbID}`};
        allmovieDetails.push(movieObj);
      }) 
      res.send(allmovieDetails);
  } else {
    res.statusCode = 400;
    res.send(moviesFound.Error);
  }
})
  .catch(err => {
    console.log(err);
  });
  });


module.exports = router;