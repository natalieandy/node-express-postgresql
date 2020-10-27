const express = require('express')

// use process.env variables to keep private variables,
require('dotenv').config()

// Express Middleware
const helmet = require('helmet') // creates headers that protect from attacks (security)
const bodyParser = require('body-parser') // turns response into usable format
const cors = require('cors')  // allows/disallows cross-site communication
const morgan = require('morgan') // logs requests
const handlebars = require('handlebars');

// db Connection w/ Heroku
 const db = require('knex')({
   client: 'pg',
   connection: {
     connectionString: process.env.REMOTE_DB_URL,
     ssl: true
   }
 });

// db Connection w/ localhost
/*var db = require('knex')({
  client: 'pg',
  connection: {
    host : 'sql-exercises.20bits.com',
    user : 'student',
    password : 'sqlrocks123!',
    database : 'sql_exercises'
  }
});*/

// Controllers - aka, the db queries
const main = require('./controllers/main')

// App
const app = express()

// App Middleware
const whitelist = ['http://localhost:3001','http://localhost:3000']
const corsOptions = {
  origin: function (origin, callback) {
      console.log(origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(helmet())
app.use(cors())
app.use(bodyParser.json())
app.use(morgan('combined')) // use 'tiny' or 'combined'
/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
// App Routes - Auth
app.get('/', (req, res) => res.send('hello world'))
app.get('/artists', (req, res) => main.getArtistsData(req, res, db))
app.get('/albums', (req, res) => main.getAlbumsData(req, res, db))
app.get('/customers', (req, res) => main.getCustomersData(req, res, db))
app.get('/employees', (req, res) => main.getEmployeesData(req, res, db))
app.get('/genres', (req, res) => main.getCustomersData(req, res, db))

// App Server Connection
app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT || 3000}`)
})