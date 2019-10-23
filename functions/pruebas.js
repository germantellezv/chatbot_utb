

/* const cheerio = require('cheerio');
const rp = require('request-promise');
const options = {
    uri: 'https://www.utb.edu.co/eventos',
    transform: function(body){
        return cheerio.load(body);
    }
}
rp(options)
    .then($ => {
        var eventsTitles = []
        var query = $('.product-title').each(function(i,elem) {
            var event = $(this).text()
            eventsTitles.push(event)
        })
        console.log(`Este mes tenemos estos eventos disponibles:\n${eventsTitles[0]} y ${eventsTitles[1]}`);

    }).catch(err => console.log(err))

 */

/* const cheerio = require('cheerio');
const rp = require('request-promise');
const options = {
    // uri: 'https://www.utb.edu.co/eventos',
    uri: 'https://germantellezv.github.io',
    transform: function(body){
        return cheerio.load(body);
    }
}
rp(options)
    .then($ => {
        // $('li[class=small]').html()
        var projectsTitles = []
        var query = $('.project-title').each(function(i,elem) {
            var project = $(this).text()
            projectsTitles.push(project)
        })
        console.log(projectsTitles);

    }).catch(err => console.log(err))
 */


/* const cheerio = require('cheerio');
const rp = require('request-promise');
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