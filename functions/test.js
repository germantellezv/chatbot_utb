var rp = require('request-promise');
const cheerio = require('cheerio');
// const fs = require('fs');

function mostrarEventos() {
    var options = {
        uri: 'germantellezv.github.io/',
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    rp(options)
    .then($ => {
        // Process html like you would with jQuery...
        var lista = []
        $('p.project-title','div.project-list').each(function(){
            var titulo = $(this).text()
            lista.push(titulo)
            console.log(titulo);
        })
        console.log(lista[0]);
        return console.log('Hola mundo')
    })
    .catch(err => {
        // Crawling failed or Cheerio choked...
        console.log(err);
        return console.log('Error:',err)
    });
}
mostrarEventos()



/* request('https://germantellezv.github.io/',(err,res,body) => {
    if (!err && res.statusCode === 200){
        let $ = cheerio.load(body);
        $('p.project-title','div.project-list').each(function(){
            let titulo = $(this).text()
            console.log(titulo);
        })
    }
}) */