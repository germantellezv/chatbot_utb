

// Intent básico para webscrapping
/* function mostrarEventos(agent) {
    const cheerio = require('cheerio');
    const rp = require('request-promise');
    // const url = 'https://germantellezv.github.io'
    const options = {
        uri: 'http://germantellezv.github.io/',
        transform: function(body){
            return cheerio.load(body);
        }
    }
    return rp(options)
        .then($ => {
            var query = $('.projects-title').find('p').text()
            agent.add(`${query}`)
            agent.add('hola mundo')
            return console.log('testing');
        }).catch(err => {
            agent.add(`${err}`)
            return console.log(err)
        })
} */

// Intent de Horario semillero que hace consulta a firestore
/* async function mostrarSemilleros(agent) {
    let datos = await db.collection('horarioSemilleros').doc('IA').get().then(doc => {
        agent.add(`Semillero de ${doc.data().nombre} a cargo del profesor ${doc.data().profesor}. ${doc.data().description}`);
        return console.log(doc.data().profesor);
    }).catch(err => {
        return console.log('Error', err);
    });
} */

// Intent inicial -  Default Welcome Intent
    /*     function opcionesIniciales(agent) {
            agent.add(`${choose(saludos)}`);
            agent.add(new Suggestion('Horarios'));
            agent.add(new Suggestion('Información'));
            agent.add(new Suggestion('Eventos'));
        } */

// limpiar strings con muchos espacios en blanco
/* var datos = ['Campus Tecnológico',
  '                                Parque Industrial y Tecnológico \n                                Carlos Vélez Pombo \n                                Km 1 Vía Turbaco \n\n                                Tel:+57 5 6535200 - 6619240  (+57) 323 566 8733 – 323 566 8732 - 323 566 8730 – 323 566 8729\n                            ',
  'Campus Casa Lemaitre',
  '                                Calle del Bouquet\n                                Cra.21 #25-92 \n                                Barrio Manga \n\n                                Tel:+57 5 6606041\n                            ']
var contactoSedes = []
datos.forEach(p => {
  var textoLimpio = []
  for (var i = 1; i < p.length; i++) {
        
    // Si atrás y aquí hay letra añadir la letra anterior al string
    if (p[i-1] != ' ' && p[i] != ' ') {
      textoLimpio += p[i-1]
      if (i == p.length-1){
        textoLimpio += p[i]
      }
      continue
    }
    // Si atrás hay letra y aquí hay espacio concatenar la letra
    if (p[i - 1] != ' ' && p[i] === ' ') {
      textoLimpio += p[i-1]
      continue
    }

    //Si atrás hay espacio y aquí hay espacio, terminar la iteración y no hacer nada
    if (p[i-1] === ' ' && p[i] === ' '){
      continue
    }

    //Si atrás hay espacio y aquí hay letra, concatenar espacio 
    if (p[i-1] === ' ' && p[i] != ' '){
      textoLimpio += p[i-1]
      continue
    }
  }
  contactoSedes.push(textoLimpio.replace('\n\n',' '));
}) */


// WEB SCRAPPING
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

// WEB SCRAPPING
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

// WEB SCRAPPING

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


// WEB SCRAPPING
/* const cheerio = require('cheerio');
const rp = require('request-promise');
const options = {
    uri: 'https://www.utb.edu.co',
    transform: function (body) {
        return cheerio.load(body);
    }
}
rp(options)
    .then($ => {
        var sedes = []
        var addresses = []
        var orderedInfo = []
        $('.col-xs-12.text-left.col-sm-6.col-md-6.col-lg-3.mb-sm-3.mb-3.text-bold').find('div.text-verde.h5').each(function (i, elem) {
            var tituloSede = $(this).text()
            sedes.push(tituloSede)
        })
        $('.col-xs-12.text-left.col-sm-6.col-md-6.col-lg-3.mb-sm-3.mb-3.text-bold').find('.text-regular.text-white.small').each(function (i, elem) {
            var TempAddress = $(this).text()
            var address = TempAddress.replace('\n','')
            addresses.push(address)
        })
        console.log(`Sedes: ${sedes.join('\n')}`);
        console.log(`Direcciones: ${addresses.join('\n')}`);
        for (let i=0; i<sedes.length;i++){
            orderedInfo.push(sedes[i])
            orderedInfo.push(addresses[i])
        }
        console.log(orderedInfo);
    }).catch(err => {
        // agent.add(`${err}`)
        console.log(err)
    })
 */

// WEB SCRAPPING

/* const cheerio = require('cheerio');
const rp = require('request-promise');
const options = {
    uri: 'https://www.utb.edu.co',
    transform: function (body) {
        return cheerio.load(body);
    }
}
rp(options)
    .then($ => {
        var addresses = []
        $('.col-xs-12.text-left.col-sm-6.col-md-6.col-lg-3.mb-sm-3.mb-3.text-bold').find('.text-regular.text-white.small').each(function (i,elem) {
            var address = $(this).text()
            addresses.push(address)
        })
        // console.log(query);
    }).catch(err => {
        // agent.add(`${err}`)
        console.log(err)
    })

 */

// WEB SCRAPPING
/* const cheerio = require('cheerio');
const rp = require('request-promise');
const options = {
    uri: 'https://www.utb.edu.co',
    transform: function (body) {
        return cheerio.load(body);
    }
}
rp(options)
    .then($ => {
        var sedes = []
        $('.col-xs-12.text-left.col-sm-6.col-md-6.col-lg-3.mb-sm-3.mb-3.text-bold').find('div.text-verde.h5').each(function (i,elem) {
            var tituloSede = $(this).text()
            sedes.push(tituloSede)
        })
        console.log(sedes);
        // console.log(query);
    }).catch(err => {
        // agent.add(`${err}`)
        console.log(err)
    }) */