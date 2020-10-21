// load express module
const express = require("express");

// load route files
const movies = require('./routes/api/movies');

// instantiate the app
const app = express();

// Init middleware
app.use(express.json( { extended: false}));

// setup CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin",
        "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});


// Declare port for the server to run
// process.env.PORT fetches value of PORT from the deployed server
// Default : runs locally on port 5000
const PORT = process.env.PORT || 5000;

// Quick endpoint to test
app.get("/", (req, res) => res.send("API Running!!!"));

// Define routes
app.use('/api/movies', movies );

// start listening on the port
app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));

