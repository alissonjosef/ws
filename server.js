// use o express para criar e configurar meu servidor
const express = require("express")

const server = express()


const ideas = [
    {
        img: "https://image.flaticon.com/icons/svg/2728/2728995.svg",
        title:"Curso de Programação",
        category:"Estudo",
        description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores similique impedit soluta",
        url:"https://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2904/2904531.svg",
        title:"Curso de Programação",
        category:"Estudo",
        description:"voluptatibus quae pariatur, eaque sed corporis explicabo blanditiis quis voluptatum? Iusto est veritatis in quasi repellendus.",
        url:"https://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
        title:"Meditação",
        category:"Estudo",
        description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores similique impedit soluta",
        url:"https://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2728/2728995.svg",
        title:"Curso de Programação",
        category:"Estudo",
        description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores similique impedit soluta",
        url:"https://rocketseat.com.br"
    },
]

// configurar arquivo estaticos (css, scripts, imagem)

server.use(express.static("public"))


// configuração do nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true, // boolean
})


// criei uma rota /

// e captureo o pedido do cliente
server.get("/", function(req, res){

    const reversedIdea = [...ideas].reverse()

    let lastIdea = []
    for (let idea of reversedIdea) {
        if (lastIdea.length  < 2) {
            lastIdea.push(idea)
        }
    }


    return res.render("index.html", { ideas: lastIdea })
})

server.get("/ideias", function(req, res){

    const reversedIdea = [...ideas].reverse()

    return res.render("indeias.html", {ideas: reversedIdea})
})

// liguei meu servidor na porta 3000
server.listen(3000)