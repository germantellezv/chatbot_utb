'use strict';

const cheerio = require('cheerio');
/* const rp = require('request-promise');
// const url = 'https://germantellezv.github.io'
const options = {
    uri: 'https://germantellezv.github.io/',
    transform: function(body){
        return cheerio.load(body);
    }
}
rp(options)
    .then($ => {
        var query = $('.projects-title').find('p').text()
        console.log(query);
    }).catch(err => console.log(err)) */


/* request('https://germantellezv.github.io', (err, resp, body) => {
            if (!err && resp.statusCode === 200) {
                const $ = cheerio.load(body)
                const contenedorTitulo = $('.projects-title')
                const titulo = contenedorTitulo.find('p').text()
                console.log(titulo);
            }
        }) */


/* request('https://germantellezv.github.io', (err,resp,body) => {
    if (!err && resp.statusCode === 200){
        let $ = cheerio.load(body)
        var lista = []
        $('p.project-title','div.project-list').each(function() {
            var titulo = $(this).text()
            lista.push(titulo)
        })
    }
    // meter funcion aqui
}) */