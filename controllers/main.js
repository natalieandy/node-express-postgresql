const { format } = require("morgan")
const getAlbumsData = (req, res, db) => {
  db.select('*').from('albums')
    .then(items => {
      if (items.length) {
        res.json(items)
      } else {
        res.json([])
      }
    })
    .catch(err => res.status(400).json({ dbError:err}))
}
const getArtistsData = (req, res, db) => {
  db.select('*').from('artists')
    .then(items => {
      if (items.length) {
        res.json(items)
      } else {
        res.json([])
      }
    })
    .catch(err => res.status(400).json({ dbError:err}))
}


const getCustomersData = (req, res, db) => {
  db.select('*').from('customers')
    .then(items => {
      if (items.length) {
        res.json(items)
      } else {
        res.json([])
      }
    })
    .catch(err => res.status(400).json({ dbError:err}))
}
const getEmployeesData = (req, res, db) => {
  db.select('*').from('employees')
    .then(items => {
      if (items.length) {
        res.json(items)
      } else {
        res.json([])
      }
    })
    .catch(err => res.status(400).json({ dbError:err}))
}
const getGenresData = (req, res, db) => {
  db.select('*').from('genres')
    .then(items => {
      if (items.length) {
        res.json(items)
      } else {
        res.json([])
      }
    })
    .catch(err => res.status(400).json({ dbError:err}))
}


module.exports = {
  getArtistsData,
 getAlbumsData,
 getCustomersData,
 getEmployeesData,
 getGenresData
}