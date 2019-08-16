exports.getAllMoves = function (res, mysqlPool, context, onComplete){
    mysqlPool.query("SELECT m.id, m.name, m.power, m.accurary, t.id as tid, t.name as tname FROM move m join type t on m.type=t.id", function(error, results, fields){
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


function searchMoveByName(db, move_name, res) {
    let wildcardName = "%" + move_name + "%";
    let sql = `SELECT * FROM move where name like ?`;

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


function updateMove(db, move) {
    let sql = `insert into move (id, name, type, power, accuracy) values (?, ?, ?, ?, ?) on duplicate key update name=values(name), type=values(type), power=values(power), accuracy=values(accuracy)`;
    let inserts = [move.id, move.name, move.type, move.power, move.accuracy];

    db.query(sql, inserts)
        .then(() => {
            return db.close();
        })
        .then(() => {
            return null;
        })
        .catch(err => {
            return err;
        });
}


exports.getMoveByName = getMoveByName;
exports.searchMoveByName = searchMoveByName;
exports.updateMove = updateMove;
