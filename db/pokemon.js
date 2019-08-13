const { getTypesByPokemonId } = require('./type')

exports.getAllPokemons = function (res, mysqlPool, context, onComplete){
    console.log("getPokemon pool:", mysqlPool)
        mysqlPool.query("SELECT * FROM pokemon", function(error, results, fields){
            if(error){
                console.log("ERROR:", error)
                res.write(JSON.stringify(error))
                res.end()
            }
            console.log("results: ", results)
            res.json(results)
            return results
            if (context != null)
                context.pokemon = results
            if (onComplete != undefined)
                onComplete()
        });
}


// Resulting object defined in data_shapes.json 
/*
function getPokemonByName(res, mysqlPool, context, onComplete, pokemon_name) {
    console.log(`Getting Pokemon ${pokemon_name}`)
    let pokemon = {}
    let ting = null
    
    let inserts = [ pokemon_name ]

    let sql = `select t.id, t.name from pokemon_type pt join type t on pt.type_id = t.id where pt.pokemon_id = ?`
    // Set id
    pokemon.name = pokemon_name
    mysqlPool.query(`select p.id, p.name, p.description,  e.id as eid, e.name as ename from pokemon p left join pokemon e on e.id=p.evolution where p.name="${pokemon_name}"`, 
            function(error, results, fields) {
                if (error) {
                console.log("ERROR:", error)
                res.write(JSON.stringify(error))
                res.end()
            }

                mysqlPool.query(sql, results[0].id, function(error, results, fields) {
                    if (error) {
                        console.log("ERROR:", error)
                        res.write(JSON.stringify(error))
                        res.end()
                    }
                    console.log("resulties")
                    console.log(results)

                })

// Gets the Pokemon and all it's evolutions                
//            if (results[0].eid != null) {
//                getPokemonByName(res, mysqlPool, context, onComplete, results[0].ename)
//            }


//                getTypesByPokemonId(res, mysqlPool, context, onComplete, results[0].id)

            console.log(`Results: ${JSON.stringify(results)}`)
 //           ting = results
   //         pokemon = results
        })
  //  console.log("ting:", JSON.stringify(ting))
 //   console.log("maybe", JSON.stringify(typeof(maybe)))
  //  console.log("maybemon", JSON.stringify(pokemon))
    return pokemon

}*/


function getPokemonByName(db, pokemon_name, res) {
    let sql = `select p.id, p.name, p.description,  e.id as eid, e.name as ename from pokemon p left join pokemon e on e.id = p.evolution where p.name = ?` 
    let sql_two = `select t.id, t.name from pokemon_type pt join type t on pt.type_id = t.id where pt.pokemon_id = ?`
 
    let someRows, otherRows;

    //let db = new Database(dbConfig)
    db.query(sql, pokemon_name)
        .then( rows => {
            someRows = rows
//            console.log("Pokemon results:", someRows)
            return db.query(sql_two, someRows[0].id)
        })
        .then( rows => {
            otherRows = rows
//            console.log("Type Results:", otherRows)
            return db.close()
        })
        .then( () => {
            let pokemon = {
                id: someRows[0].id,
                name: someRows[0].name,
                description: someRows[0].description,
                evolution: {
                    id: someRows[0].eid,
                    name: someRows[0].ename
                },
                types: []
            }

            for (let key of otherRows) {
                console.log(key)
                pokemon.types.push({
                    id: key.id,
                    name: key.name
                }) 
            }

            console.log("---------------Final callback")
            console.log("mon:", pokemon)
            res.json(pokemon)
//            console.log("Pokemon results:", someRows)
//            console.log("Type Results:", otherRows)
        })
            //console.log("-------------post query")
            //console.log("Pokemon results:", someRows)
            //console.log("Type Results:", otherRows)


    //return someRows
}


exports.getPokemonByName = getPokemonByName

