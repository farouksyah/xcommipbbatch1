'use strict'

const restify = require('restify');
const mongodb = require('mongodb').MongoClient;
const plugins = require('restify-plugins');
const assert = require('assert');

const server = restify.createServer({
    name:'rest',
    version:'0.0.1'
})

server.use(plugins.jsonBodyParser({mapParams:true}))
server.use(plugins.acceptParser(server.acceptable))
server.use(plugins.queryParser({mapParams:true}))
server.use(plugins.fullResponse())

server.listen(8889,()=>{
    console.log("Server running");
    mongodb.connect('mongodb://@localhost:27017/',(err,client)=>{
    //mongodb.connect('mongodb://paiminpaijo:paiminpaijo@cluster0-shard-00-00-bqs9c.mongodb.net:27017,cluster0-shard-00-01-bqs9c.mongodb.net:27017,cluster0-shard-00-02-bqs9c.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',(err,client)=>{    
        if (err) {
            console.log("connection failed");
            process.exit(1);
        }
        console.log("Connection successfully to DB server");

        const db = client.db('DBPenerbit');

        require('./routes')({db,server})
        
    })
})

