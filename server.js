// use o express para criar e configurar meu servidor
const express = require("express")

const server = express()

const db = require("./db")

// configurar arquivo estaticos (css, scripts, imagem)

server.use(express.static("public"))

//habilitar o uso de req.bady
server.use(express.urlencoded({ extended: true }))

// configuração do nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true, // boolean
})


// criei uma rota /

// e captureo o pedido do cliente
server.get("/", function(req, res){

     db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        } 

        const reversedIdea = [...rows].reverse()

    let lastIdea = []
    for (let idea of reversedIdea) {
        if (lastIdea.length  < 2) {
            lastIdea.push(idea)
        }
    }
    
    return res.render("index.html", { ideas: lastIdea })
    })


    
})

server.get("/ideias", function(req, res){


    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        } 

        const reversedIdea = [...rows].reverse()

        return res.render("indeias.html", {ideas: reversedIdea})

    })

    
})

server.post("/", function(req, res) {
         const query = `
            INSERT INTO ideas (
                image,
                title,
                category,
                description,
                link

            ) VALUES (?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ]
    db.run(query, values, function(err){
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        } 

        return res.redirect("/ideias")

    })
})
// liguei meu servidor na porta 3000
server.listen(3000)