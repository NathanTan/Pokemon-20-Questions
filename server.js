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

function deleteData(tableName, id, returnUrl, res) {
    let sql = `delete from ${tableName} where id=?`
    let inserts = [id]
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

    // let user assign pokemon number as id for now.
    // pokemon.id = 9999 // TODO: Make this auto increment in the db
    pokemon.evolution = null // TODO: fix this

    // TODO: collapse into two writes, one response.

    let sql = "insert into pokemon (id, name, evolution, description) values (?, ?, ?, ?)"
    let inserts = [pokemon.id, pokemon.name,  pokemon.evolution, pokemon.description]

    writeData(sql, inserts, './draft/pokemon.html', res)

    //
    // let typesql = "insert into pokemon_type(pokemon_id, type_id) values (?, ?);"
    // let typedata = [pokemon.id, pokemon.ptype]
    //
    // writeData(typesql, typedata, './draft/pokemon.html', res)
})

app.post('/trainer', (req, res) => {
    let trainer = req.body
    getAllTrainers(res, pool, null, null)
    console.log(req.body)
    
    let sql = "insert into trainer (id, name) values (?,?)"
    let inserts = [trainer.id, trainer.name]

    writeData(sql, inserts, './draft/trainer.html', res)
})

app.post('/type', (req, res) => {
    let type = req.body
    getAllTypes(res, pool, null, null)

    let sql = "insert into type (name) values (?)"
    let insert = [type.name]

    writeData(sql, insert, './draft/type.html', res)
})

/* Puts */

app.put('/move', (req, res) => {
    console.log(req.body)
    let move = req.body

    let sql = "UPDATE move SET name=?, power=?, accuracy=? WHERE id=?"
    let inserts = [move.number, move.name, move.power, move.accuracy]
    writeData(sql, inserts, './draft/move.html', res)
})

app.put('/pokemon', (req, res) => {
    console.log(req.body)
    let pokemon = req.body

    let sql = "update pokemon set name=?, evolution=?, description=? where id=?"
    let inserts = [pokemon.id, pokemon.name,  pokemon.evolution, pokemon.description]
    writeData(sql, inserts, './draft/pokemon.html', res)    
})

app.put('/trainer', (req, res) => {
    console.log(req.body)
    let trainer = req.body

    let sql = "update trainer set name=? where id=?"
    let inserts = [trainer.id, trainer.name]

    writeData(sql, inserts, './draft/trainer.html', res)
})

app.put('/type', (req, res) => {
    console.log(req.body)
    let type = req.body

    let sql = "update type set name=? where id=?"
    let inserts = [type.name, type.id]

    writeData(sql, inserts, './draft/type.html', res)    
})

/* deletes */
app.delete('/move', (req, res) => {
    console.log(req.body)
    let move = req.body

    deleteData('move', move.id, './draft/move.html', res)
})

app.delete('/pokemon', (req, res) => {
    console.log(req.body)
    let pokemon = req.body

    deleteData('pokemon', move.id, './draft/pokemon.html', res)
})

app.delete('/trainer', (req, res) => {
    console.log(req.body)
    let trainer = req.body

    deleteData('trainer', move.id, './draft/trainer.html', res)
})

app.delete('/type', (req, res) => {
    console.log(req.body)
    let move = req.body

    deleteData('type', move.id, './draft/type.html', res)
})


app.use('*', function (req, res, next) {
    res.status(404).json({
        error: "Requested resource " + req.originalUrl + " does not exist"
    })
})

app.listen(port, function () {
    console.log('listening on port', port)
});
