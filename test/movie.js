const chai = require('chai');
const chaiHttp = require('chai-http');
const expect =  require('chai').expect;
const { response } = require('express');
const server = require('../server');
let mockMovies = require('./mockData');

//Assertion style
chai.should()
chai.use(chaiHttp);

describe('Movies API',()=> {

  /**
   * Test GET basic test route
   */
  describe('GET /api/movies', ()=> {
    it('should reach default route', (done) => {
      const mockResponseText = 'Movie route reached';
      chai.request("http://localhost:5000")
      .get("/api/movies")
      .end((err, response) => {
        response.should.have.status(200);
        expect(response.text).to.equal(mockResponseText);
      done();
      })
    })
  })

  /**
   * Test GET basic test route
   */
  describe('GET /api/movies', ()=> {
    it('should not reach default route', (done) => {
      const mockResponseText = 'Movie route reached';
      chai.request("http://localhost:5000")
      .get("/api/movi")
      .end((err, response) => {
        response.should.have.status(404);
      done();
      })
    })
  })

  /**
   * Test GET Route to get movie by title
   */
  describe('GET /api/movies/movie/:movieName', ()=> {
    it('shoud get all movies having movieName', (done) => {
      chai.request("http://localhost:5000")
      .get("/api/movies/movie/newton")
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.movies.should.be.a('array');
      done();
      })
    })
  })


  /**
   * Test GET Route to get movie that returns no result due to 'too many matches'
   */
  describe('GET /api/movies/movie/:movieName', ()=> {
    it('shoud get show 400 code for search text that fetches many result from omdb api', (done) => {
      const mockResponseText = 'Too many results.';
      chai.request("http://localhost:5000")
      .get("/api/movies/movie/k")
      .end((err, response) => {
        response.should.have.status(400);
        expect(response.text).to.equal(mockResponseText);
      done();
      })
    })
  })

  /**
   * Test GET Route to get movie that returns no result due to 'no match found'
   */
  describe('GET /api/movies/movie/:movieName', ()=> {
    it('shoud get show 400 code for search text that fetches many result from omdb api', (done) => {
      const mockResponseText = 'Movie not found!';
      chai.request("http://localhost:5000")
      .get("/api/movies/movie/knjdhdsjsd")
      .end((err, response) => {
        response.should.have.status(400);
        expect(response.text).to.equal(mockResponseText);
      done();
      })
    })
  })


  /**
   * Test GET Route to get movie by title and pageNumber
   */
  describe('GET /api/movies/movie/:movieName/:pageNum', ()=> {
    it('shoud get all movies having movieName & pageNum', (done) => {
      chai.request("http://localhost:5000")
      .get("/api/movies/movie/newton/1")
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.movies.should.be.a('array');
      done();
      })
    })
  })

})