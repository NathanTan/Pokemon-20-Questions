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
exports.getPokemonByName = function(res, mysqlPool, context, onComplete, pokemon_name) {
    console.log(`Getting Pokemon ${pokemon_name}`)
    let pokemon = {}
    
    let inserts = [ pokemon_name ]

    // Set id
    pokemon.name = pokemon_name
    mysqlPool.query(`select p.id, p.name, p.description,  e.id as eid, e.name as ename from pokemon p left join pokemon e on e.id=p.evolution where p.name="${pokemon_name}"`, 
            function(error, results, fields) {
                if (error) {
                console.log("ERROR:", error)
                res.write(JSON.stringify(error))
                res.end()
            }
            console.log(`Results: ${JSON.stringify(results)}`)

        })

}
