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
    const genre = req.params.genre
// const listFilms = filmes.filter(e => e.genre.includes(genre)) --includes busca um texto dentro de array
    let listFilms = [];
    for (let i=0; i < filmes.length; i++) {
        for(let j=0; j < filmes[i].genre.length; j++) {
            if (filmes[i].genre[j] === genre) {
                listFilms.push(filmes[i]);
            }
        }
    }
     if(listFilms.length === 0) {
         res.send('Genero não localizado.')
    }

    res.status(200).send(listFilms)
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
    const titulo = req.params.titulo;
    const filme = filmes.find(filme => filme.title == titulo);
    if (!filme) {
        res.send('Filme não localizado.')
    }
    const { genre } = req.body;
    filme.genre.push(genre);
        
    fs.writeFile("./src/model/filmes.json", JSON.stringify(filmes), 'utf8', function (err) {
        if (err) {
            return res.status(500).send({ message: err });
        }
        console.log("The file was saved!");
    });
    
    return res.status(201).send(filmes);
    }