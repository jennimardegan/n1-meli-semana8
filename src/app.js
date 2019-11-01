const express = require('express')
const app = express()

//rotas
const index = require('./routes/index')
const filmes = require('./routes/filmesRoute')

app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*") // adicionado para funcionar exemplo site (reprograma)
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.use('/filmes', filmes)

module.exports = app