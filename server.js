'use strict';

require('dotenv').config();

const express = require('express');
const superagent = require('superagent');
const PORT = process.env.PORT || 3000;

const app = express();

//brings in EJS
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'));

//If it finds the route
app.get ('/', (request, response) => {
  response.status(200).send('Hola Mundo');
});

app.get('/test', (request, response) => {
  response.status(200).render('pages/index');
});


app.get('/new', (request, response) => {
  response.status(200).render('pages/searches/new')
});
// app.post('/city', (request, response) => {
//   response.status(200).send(request.body.article);
// });

// This will force an error
app.get('/badthing', (request,response) => {
  throw new Error('bad request???');
});

// 404 Handler
app.use('*', (request, response) => {
  console.log(request);
  response.status(404).send(`Can't Find ${request.path}`);
});

// Error Handler
app.use( (err,request,response,next) => {
  console.error(err);
  response.status(500).send(err.message);
});

// Startup
function startServer() {
  app.listen( PORT, () => console.log(`Server running on ${PORT}`));
}

startServer();
