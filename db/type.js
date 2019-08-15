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
    let sql2 = "select * from type_effect te " +
                "join effect e on te.effect_id = e.id " +
                "join type t on te.type_id2 = t.id " +
                "where te.type_id1 = ?"
    let sql3 = "select * from type t where t.id in (?)"
 
    let someRows, otherRows, lastRows;

    db.query(sql, type_name)
        .then( rows => {
            someRows = rows
            return db.query(sql2, someRows[0].id)
        })
        .then( rows => {
            otherRows = rows
            let ids = []
            for (let key of otherRows) {
                ids.push(key.type_id2)
            }
            if (ids.length > 0) {
                return db.query(sql3, ids)
            }
        })
        .then( rows => {

            lastRows = rows
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
                switch (key.effect_id) {
                    case 0:
                        notEffective.types.push({
                            id: key.type_id2,
                            name: key.name
                        })
                    break
                    case 1:
                        superEffective.types.push({
                            id: key.type_id2,
                            name: key.name
                        })
                    break
                    case 2:
                        noEffect.types.push({
                            id: key.type_id2,
                            name: key.name
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
        .catch(err => {
            console.log("Error getting Type " + type_name + ": " + err);
        });
}


function updateType(db, type) {
    let insertId = -1;
    let sql = `insert into type (name) values (?)`;
    let inserts = [type.name];

    if (type.id !== "") {
        insertId = type.id;
        sql = `update type set name=? where id=?`;
        inserts = [type.name, type.id];
    }

    db.query(sql, inserts)
        .then((rows) => {
            if (insertId < 0) {
                insertId = rows.insertId;
            }

            let sql = `delete from type_effect where type_id1 = ?`;
            let inserts = [insertId];
            return db.query(sql, inserts);
        })
        .then(() => {
            let sql = `insert into type_effect (type_id1, type_id2, effect_id) values ?`;
            let inserts = [];
            if (type.hasOwnProperty("weak")) {
                for (let i = 0; i < type.weak.length; i++) {
                    inserts.push([insertId, type.weak[i], 0]);
                }
            }
            if (type.hasOwnProperty("strong")) {
                for (let i = 0; i < type.strong.length; i++) {
                    inserts.push([insertId, type.strong[i], 1]);
                }
            }
            if (type.hasOwnProperty("none")) {
                for (let i = 0; i < type.none.length; i++) {
                    inserts.push([insertId, type.none[i], 2]);
                }
            }
            if (inserts.length > 0) {
                return db.query(sql, [inserts]);
            }
        })
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

exports.getTypeByName = getTypeByName;
exports.updateType = updateType;
