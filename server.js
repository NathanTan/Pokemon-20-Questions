const path = require('path')
const express = require('express')

const app = express()
const { getPokemon } = require('./db/pokemon')

const staticPath = path.join(__dirname, '/public')
app.use(express.static(staticPath))

const port = process.env.PORT || 7433
const bodyParser = require('body-parser')

/* Create Pool */
const { createPool } = require('mysql')
const { pool } = require('./db/sqlPool')
//const pool = createPool() // TODO: add the sql pool object
//console.log("the thing: " + JSON.stringify(process.env.MYSQL_USER))

//const pool = require('./dbcon.js')


app.use(bodyParser.urlencoded({ extended: true }))

/* Routes */
app.get('/move', (req, res, next) => {
    res.status(200).sendFile('./draft/move.html', {root: __dirname })
})

app.get('/pokemon', (req, res, next) => {


    //    console.log('mysql: ' + JSON.stringify(mysqlPool))
    console.log('pool:', pool)
    
    let allPokemon = getPokemon(res, pool, null, null)
    console.log(allPokemon)
    res.status(200).sendFile('./draft/pokemon.html', {root: __dirname })
})

app.get('/trainer', (req, res, next) => {
    res.status(200).sendFile('./draft/trainer.html', {root: __dirname })
})

app.get('/type', (req, res, next) => {
    res.status(200).sendFile('./draft/type.html', {root: __dirname })
})

app.get('/', (req, res, next) => {
    res.status(200).sendFile('./draft/index.html', {root: __dirname })
})

/* Posts */
app.post('/move', (req, res) => {
    console.log(req.body)
    let move = req.body
    res.status(200).sendFile('./draft/move.html', {root: __dirname })
})

app.post('/pokemon', (req, res) => {
    console.log(req.body)
    let pokemon = req.body
    res.status(200).sendFile('./draft/pokemon.html', {root: __dirname })
})

app.post('/trainer', (req, res) => {
    console.log(req.body)
    let trainer = req.body
    res.status(200).sendFile('./draft/trainer.html', {root: __dirname })
})

app.post('/type', (req, res) => {
    console.log(req.body)
    let type = req.body
    res.status(200).sendFile('./draft/type.html', {root: __dirname })
})

app.use('*', function (req, res, next) {
    res.status(404).json({
        error: "Requested resource " + req.originalUrl + " does not exist"
    })
})

app.listen(port, function () {
    console.log('listening on port', port)
});
