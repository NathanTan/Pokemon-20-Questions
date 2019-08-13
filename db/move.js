exports.getAllMoves = function (res, mysqlPool, context, onComplete){
    mysqlPool.query("SELECT * FROM move", function(error, results, fields){
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
function getMoveByName(db, move_name, res) {
    let sql = "select * from move where move.name = ?" 
    let sql2 = "select * from type where id = ?"
    let someRows, otherRows

    db.query(sql, move_name)
        .then( rows => {
            someRows = rows
            return db.query(sql2, someRows[0].type)
        })
        .then( rows => {
            otherRows = rows
            return db.close()
        })
        .then( () => {
            let move = {
                id: someRows[0].id,
                name: someRows[0].name,
                power: someRows[0].power,
                accuracy: someRows[0].accuracy,
                type: otherRows[0]
            }

            console.log("Returning move:", move)
            res.json(move)
        })
}

exports.getMoveByName = getMoveByName
