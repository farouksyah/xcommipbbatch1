'use strict'

module.exports = function (ctx) {
    console.log('function is running');
    const db = ctx.db,
    server = ctx.server

    const collection = db.collection('cPengarang')
    server.get('/pengarang',(req,res,next)=>{
        let limit = parseInt(req.query.limit,10) || 10,
        skip = parseInt(req.query.skip,10) || 0,
        query = req.query || {}

        collection.find(query).toArray()
            .then(docs => res.send(200,docs))
            .then(err => res.send(500,err))
        
            next()
    })
}

