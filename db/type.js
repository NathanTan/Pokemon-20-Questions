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

// Resulting object defined in data_shapes.json 
function getTypeByName(db, type_name, res) {
    let sql = "select * from type t where t.name = ?"
    let sql2 = "select te.type_id2, t.name, te.effect_id, e.name from type_effect te " +
                "join effect e on te.effect_id = e.id " +
                "join type t on te.type_id2 = t.id " +
                "where te.type_id1 = ?"
    let sql3 = "select * from type t where t.id in (?)"
 
    let someRows, otherRows, lastRows;

    db.query(sql, type_name)
        .then( rows => {
            someRows = rows
            console.log("1:", someRows)
            return db.query(sql2, type_name)
        })
        .then( rows => {
            otherRows = rows
            console.log("2:", otherRows)
            let ids = []
            console.log("keys")
            for (let key of otherRows) {
    console.log(key)
                ids.push(key.type_id2)
            }
    console.log("ids", ids)    
        return db.query(sql3, ids) 
        })
        .then( rows => {

            lastRows = rows
            console.log("lastRows", lastRows)
            return db.close()
        })
        .then( () => {
            let type = {
                id: someRows[0].id,
                name: someRows[0].name,
                effects: []
            }

            let notEffective = { id: 1, name: "Not Very Effective", types: [] }
            let superEffective = { id: 2, name: "Super Effective", types: [] }
            let noEffect = { id: 3, name: "Does Not Effect", types: [] }

            // Adding Pokemon
            for (let key of otherRows) {
                console.log
                console.log(key)
                switch (key.effect_id) {
                    case 0:
                        notEffective.types.push({
                            id: key.type_id2,
                            name: "tbd"
                        })
                    break
                    case 1:
                        superEffective.types.push({
                            id: key.type_id2,
                            name: "tbd"
                        })
                    break
                    case 2:
                        notEffective.types.push({
                            id: key.type_id2,
                            name: "tbd"
                        })
                    break
                }
            }

            type.effects.push(notEffective)
            type.effects.push(superEffective)
            type.effects.push(noEffect)

            console.log("type:",type)
            res.json(type)
        })
}
exports.getTypeByName = getTypeByName
