// load express module
const express = require("express");

// instantiate the app
const app = express();

// Declare port for the server to run
// process.env.PORT fetches value of PORT from the deployed server
// Default : runs locally on port 5000
const PORT = process.env.PORT || 5000;

// Quick endpoint to test
app.get("/", (req, res) => res.send("API Running"));

// start listening on the port
app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));
