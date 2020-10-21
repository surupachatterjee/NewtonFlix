// load the required modules
const express = require('express');
const router = express.Router();
const {check, validationResult } = require('express-validator');
const axios = require('axios');


// load config details
const OMDBURI = require('../../config/keys').OMDBURI;
const OMDBAPIKEY = require('../../config/keys').OMDBAPIKEY;
const IMDBURI = require('../../config/keys').IMDBURI;

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
    //console.log(moviesFound);
    if (moviesFound.Response === 'True') {
      moviesFound.Search.map(movieObj => {
        movieObj = {...movieObj, imDBLink: `${IMDBURI}/title/${movieObj.imdbID}`};
        allmovieDetails.push(movieObj);
      }) 
      //res.send(allmovieDetails);
      const totalResults=Number(moviesFound.totalResults);
      const totalPages=Math.ceil(totalResults/allmovieDetails.length);
      const result = {
        currentPage:1,
        totalPages,
        totalResults,
        movies:allmovieDetails
      }
      res.send(result);
  } else {
    res.statusCode = 400;
    res.send(moviesFound.Error);
  }
})
  .catch(err => {
    console.log(err);
  });
  });

// @route   GET api/movies/movie/:movieName/:pageNum
// @desc    Get by movie name and page number
// @access  Public
router.get('/movie/:movieName/:pageNum', ({ params: { movieName,pageNum } }, res) => {
  console.log(movieName,pageNum);
  axios.get(`${OMDBURI}/?apikey=${OMDBAPIKEY}&type=movie&s=${movieName}&page=${pageNum}`)
  .then(resp => {
    // console.log(resp);
    // res.send(resp.data);
    let allmovieDetails = [];
    const moviesFound = resp.data;
    //console.log(moviesFound);
    if (moviesFound.Response === 'True') {
      moviesFound.Search.map(movieObj => {
        movieObj = {...movieObj, imDBLink: `${IMDBURI}/title/${movieObj.imdbID}`};
        allmovieDetails.push(movieObj);
      }) 
      const totalResults=Number(moviesFound.totalResults);
      const totalPages=Math.ceil(totalResults/allmovieDetails.length);
      const result = {
        currentPage:pageNum,
        totalPages,
        totalResults,
        movies:allmovieDetails
      }
      res.send(result);
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