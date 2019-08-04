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

