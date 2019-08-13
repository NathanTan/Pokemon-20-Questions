exports.getAllTrainers = function (res, mysqlPool, context, onComplete){
        mysqlPool.query("SELECT * FROM trainer", function(error, results, fields){
            if(error){
                console.log("ERROR:", error)
                res.write(JSON.stringify(error))
                res.end()
            }
            res.json(results)
            return results
            if (context != null)
                context.pokemon = results
            if (onComplete != undefined)
                onComplete()
        });
}

// Resulting object defined in data_shapes.json 
function getTrainerByName(db, trainer_name, res) {
    let sql = "select * from trainer t where t.name = ?"
    let sql2 = "select p.id, p.name from pokemon p " + 
                "left join pokemon_trainer pt on pt.pokemon_id = p.id " +
                "left join trainer t on t.id = pt.trainer_id " +
                "where t.name = ?"
    let sql3 = "select t.id, t.name from type t " +
                "left join trainer_type tt on tt.type_id = t.id " +
                "left join trainer tr on tr.id = tt.trainer_id " +
                "where tr.name = ?"
 
    let someRows, otherRows, lastRows;

    db.query(sql, trainer_name)
        .then( rows => {
            someRows = rows
            return db.query(sql2, trainer_name)
        })
        .then( rows => {
            otherRows = rows
            return db.query(sql3, trainer_name) 
        })
        .then( rows => {
            lastRows = rows
            return db.close()
        })
        .then( () => {
            let trainer = {
                id: someRows[0].id,
                name: someRows[0].name,
                pokemon: [],
                types: []
            }

            // Adding Pokemon
            for (let key of otherRows) {
                console.log(key)
                trainer.pokemon.push({
                    id: key.id,
                    name: key.name
                }) 
            }

            // Add types
            for (let key of lastRows) {
                trainer.types.push({
                    id: key.id,
                    name: key.name
                })
            }

            console.log("Returning Trainer:", trainer)
            res.json(trainer)
        })
}


function searchTrainerByName(db, move_name, res) {
    let wildcardName = "%" + move_name + "%";
    let sql = `SELECT * FROM trainer where name like ?`;

    let results;
    db.query(sql, wildcardName)
        .then(rows => {
            results = rows;
            return db.close()
        })
        .then(() => {
            res.json(results);
        });
}


exports.getTrainerByName = getTrainerByName;
exports.searchTrainerByName = searchTrainerByName;
