exports.getAllTypes = function (res, mysqlPool, context, onComplete){
        mysqlPool.query("SELECT * FROM type", function(error, results, fields){
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

exports.getTypesByPokemonId = function (res, mysqlPool, context, onComplete, id, pokemon_data) {
    console.log("Getting Types for Pokemon:", id)
    let sql = `select t.id, t.name from pokemon_type pt join type t on pt.type_id = t.id where pt.pokemon_id = ${id}`
    mysqlPool.query(sql, function(error, results, fields){
        if(error){
            console.log("ERROR:", error)
            res.write(JSON.stringify(error))
            res.end()
        }
       
        console.log("results: ", results)
    console.log("Pokemon data yeet: ", pokemon_data)

        res.json(results)
            return results
            if (context != null)
                context.pokemon = results
            if (onComplete != undefined)
                onComplete()
        });
}

