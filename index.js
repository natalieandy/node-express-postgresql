const express = require('express');
let Router = require('express-promise-router');
const handlebars = require('express-handlebars');
require('dotenv').config();
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

router.get('/', async (request, response) => {
  response.render('main', { layout: 'index' });
});


router.get('/albums', async (request, response) => {
  let albums = await db.select('*').from('albums').orderBy('title', 'DESC');
  console.log(albums);
  response.render('albums', { layout: 'index', albums: albums, show: true });
});

router.get('/artists', async (request, response) => {
  let artists = await db.select('*').from('artists').orderBy('name', 'DESC');
  console.log(artists);
  response.render('artists', { layout: 'index', artists: artists, show: true });
});

// SELECT title FROM albums;
router.get('/albums2', async (request, response) => {
  let albums2 = await db.select('title').from('albums');
  console.log(albums2);
  response.render('albums2', { layout: 'index', albums2: albums2, show: true });
});

// SELECT * FROM albums ORDER BY title;
router.get('/albums3', async (request, response) => {
  let albums3 = await db.select('*').from('albums').orderBy('title');
  console.log(albums3);
  response.render('albums3', { layout: 'index', albums3: albums3, show: true });
});

// SELECT * FROM albums ORDER BY title DESC;
router.get('/albums4', async (request, response) => {
  let albums4 = await db.select('*').from('albums').orderBy('title', 'DESC');
  console.log(albums4);
  response.render('albums4', { layout: 'index', albums4: albums4, show: true });
});

// SELECT * FROM albums WHERE title LIKE 'A%' ORDER BY title;
router.get('/albums5', async (request, response) => {
  let albums5 = await db.select('*').from('albums').where('title', 'like', 'A%').orderBy('title');
  console.log(albums5);
  response.render('albums5', { layout: 'index', albums5: albums5, show: true });
});

// SELECT * FROM invoices;
router.get('/invoices', async (request, response) => {
  let invoices = await db.select('*').from('invoices');
  console.log(invoices);
  response.render('invoices', { layout: 'index', invoices: invoices, show: true });
});

// SELECT * FROM invoices ORDER BY total;
router.get('/invoices2', async (request, response) => {
  let invoices2 = await db.select('*').from('invoices').orderBy('total');
  console.log(invoices2);
  response.render('invoices2', { layout: 'index', invoices2: invoices2, show: true });
});

// SELECT * FROM invoices WHERE total > 10;
router.get('/invoices3', async (request, response) => {
  let invoices3 = await db.select('*').from('invoices').orderBy('total').where('total', '>', 10);
  console.log(invoices3);
  response.render('invoices3', { layout: 'index', invoices3: invoices3, show: true });
});
/*


-- Every invoice with a total greater than 10
SELECT * FROM invoices WHERE total > 10;

-- The 10 least expensive invoices
-- Remember: ORDER BY orders from lowest-to-highest by default
SELECT * FROM invoices ORDER BY total LIMIT 10;

-- The 10 most expensive invoices
SELECT * FROM invoices ORDER BY total DESC LIMIT 10;

-- The 15 most recent invoices
SELECT * FROM invoices ORDER BY invoices DESC LIMIT 15;

-- The 15 oldest invoices
SELECT * FROM invoices ORDER BY invoices ASC LIMIT 15;

-- The 10 most expensive invoices from the US
SELECT * FROM invoices WHERE billing_country = 'USA' ORDER BY total DESC LIMIT 10;

-- The 10 least expensive invoices from the US
SELECT * FROM invoices WHERE billing_country = 'USA' ORDER BY total LIMIT 10;

-- The 10 most expensive invoices from outside the US
-- Hint: If "=" means equal, use "!=" to mean "not equal"
SELECT * FROM invoices WHERE billing_country != 'USA' ORDER BY total DESC LIMIT 10;

-- Every invoice from Chicago, IL
SELECT * FROM invoices WHERE billing_city = 'Chicago' AND billing_state = 'IL' AND billing_country='USA';

-- A list of all the invoices worth more than $5.00 from Chicago, IL
SELECT * FROM invoices WHERE billing_city = 'Chicago' AND billing_state = 'IL' AND billing_country='USA' AND total > 5.00;
*/

router.get('/invoices8', async (request, response) => {
  let invoices = await db.select('*').from('invoices').where('billing_country', 'USA').orderBy('total', 'DESC').limit(10);
  console.log(invoices);
  response.render('invoices8', { layout: 'index', invoices: invoices, show: true });
})

app.listen(port, () => console.log(`App listening to port ${port}`));
