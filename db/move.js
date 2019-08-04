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

