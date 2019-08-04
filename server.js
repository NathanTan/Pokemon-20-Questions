const path = require('path')
const express = require('express')

const app = express()
const { getAllPokemons } = require('./db/pokemon')
const { getAllTrainers } = require('./db/trainer')
const { getAllTypes } = require('./db/type')
const { getAllMoves } = require('./db/move')

const staticPath = path.join(__dirname, '/public')
app.use(express.static(staticPath))

const port = process.env.PORT || 7433
const bodyParser = require('body-parser')

/* Create Pool */
const { createPool } = require('mysql')
const { pool } = require('./db/sqlPool')

app.use(bodyParser.urlencoded({ extended: true }))

/* Routes */
app.get('/move', (req, res, next) => {
    res.status(200).sendFile('./draft/move.html', {root: __dirname })
})

app.get('/pokemon', (req, res, next) => {
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

/* READs */
app.get('/moveData', (req, res) => {
    console.log(req.body)
    let move = req.body
    getAllMoves(res, pool, null, null)
})

app.get('/pokemonData', (req, res) => {
    let context = {}
    getAllPokemons(res, pool, context, null)
})

app.get('/trainerData', (req, res) => {
    let trainer = req.body
    getAllTrainers(res, pool, null, null)
})

app.get('/typeData', (req, res) => {
    let type = req.body
    getAllTypes(res, pool, null, null)
})



/* Posts */
app.post('/move', (req, res) => {
    console.log(req.body)
    let move = req.body
//    getAllMoves(res, pool, null, null)
//    res.status(200).sendFile('./draft/move.html', {root: __dirname })

//    move.type = "Normal" // TODO: Make the type value come from the dropdown

    let sql = "insert into move (id, name, power, accuracy) values (?, ?, ?, ?)"
    let inserts = [move.number, move.name, move.power, move.accuracy]
    sql = pool.query(sql, inserts, function(error, results, fields) {
        if (error){
            res.write(JSON.stringify(error))
            res.end()
        }
        else {
            res.status(200).sendFile('./draft/move.html', {root: __dirname })
        }

    })
})

app.post('/pokemon', (req, res) => {
    let context = {}
    getAllPokemons(res, pool, context, null)
})

app.post('/trainer', (req, res) => {
    let trainer = req.body
    getAllTrainers(res, pool, null, null)
})

app.post('/type', (req, res) => {
    let type = req.body
    getAllTypes(res, pool, null, null)
})

app.use('*', function (req, res, next) {
    res.status(404).json({
        error: "Requested resource " + req.originalUrl + " does not exist"
    })
})

app.listen(port, function () {
    console.log('listening on port', port)
});
