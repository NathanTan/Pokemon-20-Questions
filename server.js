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



function writeData(sql, inserts, returnUrl, res) {
  let result = pool.query(sql, inserts, function(error, results, fields) {
        if (error){
            console.log(JSON.stringify(error))
            res.write(JSON.stringify(error))
            res.end()
        }
        else {
            res.status(200).sendFile(returnUrl, {root: __dirname })
        }
    })
}





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
    
    let sql = "insert into move (id, name, power, accuracy) values (?, ?, ?, ?)"
    let inserts = [move.number, move.name, move.power, move.accuracy]
    writeData(sql, inserts, './draft/move.html', res)
})

app.post('/pokemon', (req, res) => {
    console.log(req.body)
    let pokemon = req.body
    pokemon.id = 9999 // TODO: Make this auto increment in the db
    pokemon.evolution = null // TODO: fix this
     
    let sql = "insert into pokemon (id, name, evolution, description) values (?, ?, ?, ?)"
    let inserts = [pokemon.id, pokemon.name, pokemon.evolution, pokemon.description]

    writeData(sql, inserts, './draft/pokemon.html', res)
})

app.post('/trainer', (req, res) => {
    let trainer = req.body
    getAllTrainers(res, pool, null, null)
    console.log(req.body)
    
    let sql = "insert into trainer (id, name) values (?,?)"
    let inserts = [trainer.id, trainer. name]

    writeData(sql, inserts, './draft/trainer.html', res)
})

app.post('/type', (req, res) => {
    let type = req.body
    getAllTypes(res, pool, null, null)

    let sql = "insert into type (name) values (?)"
    let insert = [type.name]

    writeData(sql, insert, './draft/type.html', res)
})

app.use('*', function (req, res, next) {
    res.status(404).json({
        error: "Requested resource " + req.originalUrl + " does not exist"
    })
})

app.listen(port, function () {
    console.log('listening on port', port)
});
