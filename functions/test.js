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