const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); 


app.get('/index', (req, res) => res.render('index'));
app.get('/produto', (req, res) => res.render('produto'));
app.get('/contato', (req, res) => res.render('contato'));
app.get('/fotos', (req, res) => res.render('fotos'));
app.get('/detalhes', (req, res) => res.render('detalhes'));


app.post('/enviar-contato', (req, res) => {
    const novosDados = req.body; 

    const caminhoArquivo = path.join(__dirname, 'dados.json');

    fs.readFile(caminhoArquivo, 'utf8', (err, data) => {
        let lista = [];
        
        if (!err && data) {
            try {
                lista = JSON.parse(data);
            } catch (e) {
                lista = [];
            }
        }

        lista.push(novosDados);

        fs.writeFile(caminhoArquivo, JSON.stringify(lista, null, 2), (err) => {
            if (err) {
                return res.status(500).send("Erro ao salvar os dados.");
            }
            
            res.send("<h1>Dados salvos com sucesso </h1><a href='/index'>Voltar para o início</a>");
        });
    });
});

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));