const { getTypesByPokemonId } = require('./type')

exports.getAllPokemons = function (res, mysqlPool, context, onComplete){
    console.log("getPokemon pool:", mysqlPool)
        mysqlPool.query("SELECT * FROM pokemon", function(error, results, fields){
            if(error){
                console.log("ERROR:", error)
                res.write(JSON.stringify(error))
                res.end()
            }
            console.log("here")
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
function getPokemonByName(db, pokemon_name, res) {
    let sql = `select p.id, p.name, p.description,  e.id as eid, e.name as ename from pokemon p left join pokemon e on e.id = p.evolution where p.name = ?` 
    let sql_two = `select t.id, t.name from pokemon_type pt join type t on pt.type_id = t.id where pt.pokemon_id = ?`
 
    let someRows, otherRows;

    db.query(sql, pokemon_name)
        .then( rows => {
            someRows = rows
            return db.query(sql_two, someRows[0].id)
        })
        .then( rows => {
            otherRows = rows
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

            console.log("Returning Pokemon:", pokemon)
            res.json(pokemon)
        })
}


function searchPokemonByName(db, pokemon_name, res) {
    let wildcardName = "%" + pokemon_name + "%";
    let sql = `SELECT * FROM pokemon where name like ?`;

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


function updatePokemon(db, pokemon, res) {
    let sql = `insert into pokemon (id, name, evolution, description) values (?, ?, ?, ?) on duplicate key update name=values(name), evolution=values(evolution), description=values(description)`;
    let inserts = [pokemon.id, pokemon.name, pokemon.evolution, pokemon.description];

    db.query(sql, inserts)
        .then(() => {
            let sql = `delete from pokemon_type where pokemon_id = ?`;
            let inserts = [pokemon.id];
            return db.query(sql, inserts);
        })
        .then(() => {
            if (pokemon.hasOwnProperty("types")) {
                let sql = `insert into pokemon_type (pokemon_id, type_id) values ?`;
                let inserts = [];
                for (let i = 0; i < pokemon.types.length; i++) {
                    inserts.push([pokemon.id, pokemon.types[i]]);
                }
                return db.query(sql, [inserts]);
            }
        }).then(() => {
            return db.close();
        })
        .then(() => {
            res.status(200).sendFile('./draft/pokemon.html', {root: __dirname});
        })
        .catch(err => {
                console.log("Error inserting or updating Pokemon: " + JSON.stringify(err));
                res.write(JSON.stringify(err));
                res.end();
            }
        );
}

exports.getPokemonByName = getPokemonByName;
exports.searchPokemonByName = searchPokemonByName;
exports.updatePokemon = updatePokemon;
