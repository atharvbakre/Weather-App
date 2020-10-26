const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./src/utils/forecast')

// express
const app = express();
const port = process.env.PORT || 3000

// paths for express config
const publicDirectoryPath = path.join(__dirname, './public')
const viewsPath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')

// set up handlebars engine views and location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// serve the static directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Atharv Bakre'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Atharv Bakre'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Atharv Bakre'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.location){
        return res.render('error', {
            title: 'Error',
            name: 'Atharv Bakre',
            message: 'Please enter a Search Location'
        })
    }

    forecast(req.query.location, (error, data) => {
        if(error){
            return res.send({
                error
            })
        }

        res.send({
            location: req.query.location,
            forecast: data
        })
    })

})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404 Error',
        name: 'Atharv Bakre',
        message: 'Help Article Missing'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404 Error',
        name: 'Atharv Bakre',
        message: 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log('Server up and running on Port ' + port)
})