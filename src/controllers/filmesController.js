const filmes = require('../model/filmes.json')
const fs = require('fs');

exports.get = (req, res) => {
    console.log(req.url)
    res.status(200).send(filmes)
}

exports.getDiretor = (req, res) => {
    const diretor = req.params.diretor
     if(!diretor) {
         res.send('Diretor não localizado.')
    }
    res.status(200).send(filmes.filter(filme => filme.director == diretor))
}

exports.getGenero = (req, res) => {
    const genero = req.params.genero
    console.log(req.query)
     if(!genero) {
         res.send('Genero não localizado.')
    }
     const generosFilmes = filmes.genre
    const nomeGeneros = generosFilmes.filter(nome => nome == genero)
    res.status(200).send(nomeGeneros)
}

exports.post = (req, res) => {
    const { title, year, director, duration, genre, rate } = req.body;
    filmes.push({ title, year, director, duration, genre, rate });
    
    fs.writeFile("./src/model/filmes.json", JSON.stringify(filmes), 'utf8', function (err) {
        if (err) {
            return res.status(500).send({ message: err });
        }
        console.log("The file was saved!");
    });

    return res.status(201).send(filmes);
    }

    exports.postGenero = (req, res) => {
        const { genre } = req.body;
        const generosFilmes = filmes.genre
        generosFilmes.push({ genre });
        
        fs.writeFile("./src/model/filmes.json", JSON.stringify(filmes), 'utf8', function (err) {
            if (err) {
                return res.status(500).send({ message: err });
            }
            console.log("The file was saved!");
        });
    
        return res.status(201).send(filmes);
        }