const express = require('express')
const bodyParser = require('body-parser')
const { engine } = require('express-handlebars')

const app = express()
const PORT = process.env.POST || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// Set Handlebars
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

app.get('/', (req, res) => {
  res.render('home')
})

app.post('/', (req, res) => {
    const { source, attributed, quote } = req.body
    res.render('home', { source, attributed, quote })
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})

module.exports = app