function getPokemon(res, mysql, context, onComplete){
    mysql.pool.query("SELECT name FROM pokemon", function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.pokemon  = results;
        onComplete();
    });
}

export default getPokemon