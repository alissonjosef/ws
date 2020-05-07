// use o express para criar e configurar meu servidor
const express = require("express")

const server = express()

// configurar arquivo estaticos (css, scripts, imagem)

server.use(express.static("backup"))

// criei uma rota /

// e capturei p pedido do cliente
server.get("/", function(req, res){
    return res.sendFile(__dirname + "/index.html")
})

server.get("/ideias", function(req, res){
    return res.sendFile(__dirname + "/indeias.html")
})

// liguei meu servidor na porta 3000
server.listen(3000)