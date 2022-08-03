'use strict';
console.log('HERE WE GO server.js is connected!!!');




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

//search the animals
app.get('/photos', async (req, res, next) => {
  try{
      //front end will send value for a search for photos
  let searchQueryFromFrontEnd = req.query.searchQuery;
  //then take that value to use it to construct a URL to make a request to the API
  let url =`https://api.unsplash.com/search/photos/?client_id=${process.env.UNSLASH_API_KEY}&query=${searchQueryFromFrontEnd}`;
  let results = await axios.get(url);
   console.log('!!!!!!!!!!!!!!!!!',results.data);
  let pictureInstance = results.data.results.map((pic) => new Photos(pic));
  res.status(200).send(pictureInstance);

  } catch(error){
    next(error);
  }

});



app.get('*', (req, res) => {
  res.status(404).send('These are not the droids your looking 404');
});





//CLASSES
class Photos {
  constructor(picture){
    this.src = picture.urls.regular;
    this.alt = picture.alt_description;
    this.artist = picture.user.name;
  }
}
// http://localhost:3001/photos?searchQuery=kittens


//ERRORS
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) =>{
  console.log(error.message);
  res.status(500).send(error.message);
});


//LISTEN
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
