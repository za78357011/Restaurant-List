const express = require('express')
const app = express()
const { engine } = require("express-handlebars")
const restaurantList = require('./restaurant.json')
const port = 3000

app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurantList.results })
})

app.get('/search', (req, res) => {
  const restaurant = restaurantList.results.filter((restaurant) => {
    return restaurant.name.toLowerCase().includes(req.query.keywords.toLowerCase()) ||
      restaurant.category.includes(req.query.keywords.toLowerCase())
  })
  res.render('index', { restaurant: restaurant, leyword: req.query.keywords })
})

app.get('/restaurant/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.filter(restaurant => restaurant.id == req.params.restaurant_id)
  res.render('show', { restaurant: restaurant[0] })
})

app.listen(port, () => {
  console.log(`Express is listening on localhost: ${port} `)
})

