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

// SELECT * FROM invoices ORDER BY total LIMIT 10;
router.get('/invoices4', async (request, response) => {
  let invoices4 = await db.select('*').from('invoices').orderBy('total').limit(10);
  console.log(invoices4);
  response.render('invoices4', { layout: 'index', invoices4: invoices4, show: true });
});

// SELECT * FROM invoices ORDER BY total DESC LIMIT 10;
router.get('/invoices5', async (request, response) => {
  let invoices5 = await db.select('*').from('invoices').orderBy('total', 'DESC').limit(10);
  console.log(invoices5);
  response.render('invoices5', { layout: 'index', invoices5: invoices5, show: true });
});

// SELECT * FROM invoices ORDER BY invoices DESC LIMIT 15;
router.get('/invoices6', async (request, response) => {
  let invoices6 = await db.select('*').from('invoices').orderBy('invoices', 'DESC').limit(15);
  console.log(invoices6);
  response.render('invoices6', { layout: 'index', invoices6: invoices6, show: true });
});

// SELECT * FROM invoices ORDER BY invoices ASC LIMIT 15;
router.get('/invoices7', async (request, response) => {
  let invoices7 = await db.select('*').from('invoices').orderBy('invoices').limit(15);
  console.log(invoices7);
  response.render('invoices7', { layout: 'index', invoices7: invoices7, show: true });
});

// SELECT * FROM invoices WHERE billing_country = 'USA' ORDER BY total DESC LIMIT 10;
router.get('/invoices8', async (request, response) => {
  let invoices8 = await db.select('*').from('invoices').where('billing_country', 'USA').orderBy('total', 'DESC').limit(10);
  console.log(invoices8);
  response.render('invoices8', { layout: 'index', invoices8: invoices8, show: true });
})

// SELECT * FROM invoices WHERE billing_country = 'USA' ORDER BY total LIMIT 10;
router.get('/invoices9', async (request, response) => {
  let invoices9 = await db.select('*').from('invoices').where('billing_country', 'USA').orderBy('total').limit(10);
  console.log(invoices9);
  response.render('invoices9', { layout: 'index', invoices9: invoices9, show: true });
})

// SELECT * FROM invoices WHERE billing_country != 'USA' ORDER BY total DESC LIMIT 10;
router.get('/invoices10', async (request, response) => {
  let invoices10 = await db.select('*').from('invoices').where('billing_country', '<>', 'USA').orderBy('total', 'DESC').limit(10);
  console.log(invoices10);
  response.render('invoices10', { layout: 'index', invoices10: invoices10, show: true });
})

// SELECT * FROM invoices WHERE billing_city = 'Chicago' AND billing_state = 'IL' AND billing_country='USA';
router.get('/invoices11', async (request, response) => {
  let invoices11 = await db.select('*').from('invoices').where('billing_city', '=', 'Chicago').andWhere('billing_state', '=', 'IL').andWhere('billing_country', '=', 'USA');
  console.log(invoices11);
  response.render('invoices11', { layout: 'index', invoices11: invoices11, show: true });
})

// SELECT * FROM invoices WHERE billing_city = 'Chicago' AND billing_state = 'IL' AND billing_country='USA' AND total > 5.00;
router.get('/invoices12', async (request, response) => {
  let invoices12 = await db.select('*').from('invoices').where('billing_city', '=', 'Chicago').andWhere('billing_state', '=', 'IL').andWhere('billing_country', '=', 'USA').andWhere('total', '>', '5.00');
  console.log(invoices12);
  response.render('invoices12', { layout: 'index', invoices12: invoices12, show: true });
})

// SELECT billing_address FROM invoices WHERE billing_city = 'Mountain View' AND billing_state = 'CA' AND billing_country='USA' ORDER BY total DESC LIMIT 5;
router.get('/invoices13', async (request, response) => {
  let invoices13 = await db.select('billing_address').from('invoices').where('billing_city', '=', 'Mountain View').andWhere('billing_state', '=', 'IL').andWhere('billing_country', '=', 'USA').orderBy('total', 'DESC').limit(10);
  console.log(invoices13);
  response.render('invoices13', { layout: 'index', invoices13: invoices13, show: true });
})

// SELECT * FROM invoices WHERE invoice_date < '2010-01-01' ORDER BY total DESC LIMIT 10;
router.get('/invoices14', async (request, response) => {
  let invoices14 = await db.select('*').from('invoices').where('invoice_date', '<', '2010-01-01').orderBy('total', 'DESC').limit(10);
  console.log(invoices14);
  response.render('invoices14', { layout: 'index', invoices14: invoices14, show: true });
})

// SELECT COUNT(*) FROM invoices WHERE billing_city = 'Chicago' AND billing_state = 'IL' AND billing_country = 'USA';
router.get('/invoices15', async (request, response) => {
  let invoices15 = await db.count('*').from('invoices').where('billing_city', '=', 'Chicago').andWhere('billing_state', '=', 'IL').andWhere('billing_country', '=', 'USA');
  console.log(invoices15);
  response.render('invoices15', { layout: 'index', invoices15: invoices15, show: true });
})

// SELECT billing_state, COUNT(*) FROM invoices WHERE billing_country = 'USA' GROUP BY billing_state;
router.get('/invoices16', async (request, response) => {
  let invoices16 = await db.select('billing_state').count('*').from('invoices').where('billing_country', '=', 'USA').groupBy('billing_state');
  console.log(invoices16);
  response.render('invoices16', { layout: 'index', invoices16: invoices16, show: true });
})

// SELECT billing_state, COUNT(*) FROM invoices WHERE billing_country = 'USA' GROUP BY billing_state ORDER BY COUNT(*) DESC LIMIT 1;
router.get('/invoices17', async (request, response) => {
  let invoices17 = await db.select('billing_state').count('*').from('invoices').where('billing_country', '=', 'USA').groupBy('billing_state').orderBy('COUNT(*)', 'DESC').limit(1);
  console.log(invoices17);
  response.render('invoices17', { layout: 'index', invoices17: invoices17, show: true });
})

// SELECT billing_state, SUM(total) FROM invoices WHERE billing_country = 'USA' AND billing_state = 'CA' GROUP BY billing_state;
router.get('/invoices18', async (request, response) => {
  let invoices18 = await db.select('billing_state').sum('total').from('invoices').where('billing_country', '=', 'USA').andWhere('billing_state', '=', 'CA').groupBy('billing_state');
  console.log(invoices18);
  response.render('invoices18', { layout: 'index', invoices18: invoices18, show: true });
})

// SELECT billing_state, COUNT(*), SUM(total) FROM invoices WHERE billing_country = 'USA' AND billing_state = 'CA' GROUP BY billing_state;
router.get('/invoices19', async (request, response) => {
  let invoices19 = await db.select('billing_state').count('*').sum('total').from('invoices').where('billing_country', '=', 'USA').andWhere('billing_state', '=', 'CA').groupBy('billing_state');
  console.log(invoices19);
  response.render('invoices19', { layout: 'index', invoices19: invoices19, show: true });
})

// SELECT billing_state, COUNT(*), SUM(total), AVG(total) FROM invoices WHERE billing_country = 'USA' AND billing_state = 'CA' GROUP BY billing_state;
router.get('/invoices20', async (request, response) => {
  let invoices20 = await db.select('billing_state').count('*').sum('total').avg('total').from('invoices').where('billing_country', '=', 'USA').andWhere('billing_state', '=', 'CA').groupBy('billing_state');
  console.log(invoices20);
  response.render('invoices20', { layout: 'index', invoices20: invoices20, show: true });
})

// SELECT billing_state, COUNT(*), SUM(total), AVG(total) FROM invoices WHERE billing_country = 'USA' GROUP BY billing_state ORDER BY AVG(total) DESC;
router.get('/invoices21', async (request, response) => {
  let invoices21 = await db.select('billing_state').count('*').sum('total').avg('total').from('invoices').where('billing_country', '=', 'USA').groupBy('billing_state').orderBy('AVG(total)', 'DESC');
  console.log(invoices21);
  response.render('invoices21', { layout: 'index', invoices21: invoices21, show: true });
})

// SELECT billing_country, COUNT(*) FROM invoices GROUP BY billing_country ORDER BY COUNT(*) DESC LIMIT 5;
router.get('/invoices22', async (request, response) => {
  let invoices22 = await db.select('billing_country').count('*').from('invoices').groupBy('billing_country').orderBy('COUNT(*)', 'DESC').limit(5);
  console.log(invoices22);
  response.render('invoices22', { layout: 'index', invoices22: invoices22, show: true });
})

// SELECT billing_country, SUM(total) FROM invoices GROUP BY billing_country ORDER BY SUM(total) DESC LIMIT 5;
router.get('/invoices23', async (request, response) => {
  let invoices23 = await db.select('billing_country').sum('total').from('invoices').groupBy('billing_country').orderBy('SUM(total)', 'DESC').limit(5);
  console.log(invoices23);
  response.render('invoices23', { layout: 'index', invoices23: invoices23, show: true });
})

// SELECT billing_country, AVG(total) FROM invoices GROUP BY billing_country ORDER BY AVG(total) DESC LIMIT 5;
router.get('/invoices24', async (request, response) => {
  let invoices24 = await db.select('billing_country').avg('total').from('invoices').groupBy('billing_country').orderBy('AVG(total)', 'DESC').limit(5);
  console.log(invoices24);
  response.render('invoices24', { layout: 'index', invoices24: invoices24, show: true });
})

app.listen(port, () => console.log(`App listening to port ${port}`));
