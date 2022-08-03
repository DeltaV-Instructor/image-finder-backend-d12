'use strict';
console.log('server.js is connected!!!');




//REQUIRE
// ==== packages ====
const express = require('express'); // implies that express has been downloaded
//via npm
// the command to download it and save it is `npm install -S express`
const cors = require('cors'); // Cross Origin Resource Sharing : allows connection
// between 2 local servers or websites : It can block or allow access to any list
//of urls.
//By default it allows localhost to talk itself
// - needed this week only
require('dotenv').config(); // runs once and loads all the environment variables
//IF they were declared in a file instead of the terminal
const axios = require('axios');
//USE
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3002;
//ROUTES
app.get('/', (req, res) => {
  res.status(200).send('Hello from the server! Have a great day!');
});
//CLASSES
//ERRORS
//LISTEN
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
