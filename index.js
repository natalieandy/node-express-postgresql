const express = require('express');
let Router = require('express-promise-router');
const handlebars = require('express-handlebars');
require('dotenv').config();
if (process.env.REMOTE_DB_URL) {
    // db Connection w/ Heroku
    const db = require('knex')({
      client: 'pg',
      connection: {
        connectionString: process.env.REMOTE_DB_URL,
        ssl: true
      }
    });
  } else {
    // db Connection w/ localhost
    var db = require('knex')({
      client: 'pg',
      connection: {
        host: 'sql-exercises.20bits.com',
        user: 'student',
        password: 'sqlrocks123!',
        database: 'sql_exercises'
      }
    });
  }

const port = 3000;
const app = express();

app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'planB',
    partialsDir: __dirname + '/views/partials/'
}));

app.use(express.static('public'))

let router = Router();
app.use(router);

router.get('/', async (req, res) => {   
    res.render('main', {layout: 'index'});
});


router.get('/albums', async (req, res) => {
    let albums = await db.select('*').from('albums').orderBy('title', 'DESC');
    console.log(albums);
    res.render('albums', {layout: 'index', albums: albums, show: true});
});

router.get('/artists', async (req, res) => {
    let artists = await db.select('*').from('artists').orderBy('name', 'DESC');
    console.log(artists);
    res.render('artists', {layout: 'index', artists: artists, show: true});
});

app.listen(port, () => console.log(`App listening to port ${port}`));