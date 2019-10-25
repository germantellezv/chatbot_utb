'use strict';

const functions = require('firebase-functions');
const { WebhookClient } = require('dialogflow-fulfillment');
const { Card, Suggestion } = require('dialogflow-fulfillment');
const admin = require('firebase-admin');
let serviceAccount = require('./key.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();


process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {

    // --- INICIO --- //
    const emoji = require('node-emoji');
    const saludos = [`Hola! Soy Aurora. ¿Cómo te puedo ayudar?`,
        `Hola cerebrito ¿Cómo te puedo ayudar?`,
        `Hola, qué gusto saludarte!. Cuéntame, ¿Cómo te puedo ayudar?`];

    const msgListHorarios = [`Te puedo mostrar los horarios de semilleros, monitorías
 	y los horarios de atención de los profesores. ¿Con cuál te gustaría comenzar?`,
        `Tengo horario de semilleros, monitorías y el de profesores, ¿Cual te interesa conocer?`];
    // --- FIN --- //

    const agent = new WebhookClient({ request, response });
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

    // Funcion para elegir aleatoriamente
    function choose(saludos) {
        var index = Math.floor(Math.random() * saludos.length);
        return saludos[index];
    }

    // Intent Contactos
    function mostrarContacto(agent) {
        const cheerio = require('cheerio');
        const rp = require('request-promise');
        const options = {
            uri: 'https://www.utb.edu.co',
            transform: function (body) {
                return cheerio.load(body);
            }
        }
        return rp(options)
            .then($ => {
                var sedes = []
                var addresses = []
                var orderedInfo = []
                $('.col-xs-12.text-left.col-sm-6.col-md-6.col-lg-3.mb-sm-3.mb-3.text-bold').find('div.text-verde.h5').each(function (i, elem) {
                    var tituloSede = $(this).text()
                    sedes.push(tituloSede)
                })
                $('.col-xs-12.text-left.col-sm-6.col-md-6.col-lg-3.mb-sm-3.mb-3.text-bold').find('.text-regular.text-white.small').each(function (i, elem) {
                    var address = $(this).text().replace('\n', '*')
                    addresses.push(address)
                })

                for (let i = 0; i < sedes.length; i++) {
                    orderedInfo.push(sedes[i])
                    orderedInfo.push(addresses[i])
                }
                var contactoSedes = []
                orderedInfo.forEach(p => {
                    var textoLimpio = []
                    for (var i = 1; i < p.length; i++) {
                        // Si atrás y aquí hay letra añadir la letra anterior al string
                        if (p[i - 1] !== ' ' && p[i] !== ' ') {
                            textoLimpio += p[i - 1]
                            if (i === p.length - 1) {
                                textoLimpio += p[i]
                            }
                            continue
                        }
                        // Si atrás hay letra y aquí hay espacio concatenar la letra
                        if (p[i - 1] !== ' ' && p[i] === ' ') {
                            textoLimpio += p[i - 1]
                            continue
                        }

                        //Si atrás hay espacio y aquí hay espacio, terminar la iteración y no hacer nada
                        if (p[i - 1] === ' ' && p[i] === ' ') {
                            continue
                        }

                        //Si atrás hay espacio y aquí hay letra, concatenar espacio 
                        if (p[i - 1] === ' ' && p[i] !== ' ') {
                            textoLimpio += p[i - 1]
                            continue
                        }
                    }
                    contactoSedes.push(textoLimpio.replace('\n\n', ' '));
                })
                const soon = emoji.get(':soon:');
                const smile = emoji.get(':grin:');
                agent.add(`Estas son las direcciones y telefonos de los diferentes campus de la Universidad Tecnológica de Bolivar.\n\n ${contactoSedes.join(`\n`)}\n\n ${soon} Próximamente podrás consultar extensiones telefónicas...${smile}`)
                return console.log(orderedInfo);
            }).catch(err => {
                // agent.add(`${err}`)
                return console.log(err)
            })
    }

    // Intent Eventos
    async function mostrarEventos(agent) {
        const cheerio = require('cheerio');
        const rp = require('request-promise');
        const options = {
            uri: 'https://www.utb.edu.co/eventos',
            transform: function (body) {
                return cheerio.load(body);
            }
        }
        // return rp(options)
        return rp(options)
            .then($ => {
                var eventsTitles = []
                $('.product-title').each(function (i, elem) {
                    var event = $(this).text()
                    eventsTitles.push(event)
                })

                // Unir todo en un solo response para poder mostrarlo en orden. Telegram/Whatsapp lo imprime en desorden. Google Assistant no.
                const Rarrow = emoji.get(':arrow_right:');
                agent.add(`Este mes tenemos estos eventos disponibles:\n${Rarrow} ${eventsTitles.join(`\n${Rarrow} `)}\nPara obtener más información, haz clic en este enlace https://www.utb.edu.co/eventos`)
                return console.log(`Mostrar eventos disponibles de este mes.`);

            }).catch(err => {
                agent.add(`${err}`)
                return console.log(err)
            })

    }

    //Intent Testing con Entity Frutas
    async function getExtension(agent) {
        const Rarrow = emoji.get(':arrow_right:');
        var dependencia = agent.parameters['dependencias']

        var query = await db.collection(`${dependencia}`).get()
            .then((d) => {
                var datos = []
                d.forEach((empleado) => {
                    datos.push(empleado.data())
                    // agent.add('Holamundo')
                })
                var orderedInfo = []
                datos.forEach(empleado => {
                    orderedInfo.push(`${empleado['NOMBRE']}\nCargo: ${empleado['CARGO']}\nDependencia: ${empleado['DEPENDENCIA']}\nExtensión: ${empleado['EXTENSIÓN']}`)
                })
                agent.add(`En ${dependencia.toLowerCase()} te puedes contactar con:\n😁 ${orderedInfo.join('\n\n😁 ')}`)
                return console.log('Mostrando extensiones');
            })
            .catch((err) => {
                return console.log('Error getting documents', err);
            });

    }

    let intentMap = new Map();
    intentMap.set('getExtension', getExtension);
    intentMap.set('Contacto', mostrarContacto);
    intentMap.set('Eventos', mostrarEventos);
    agent.handleRequest(intentMap);
});
// Para efectuar los cambios en DialogFlow usar el siguiente comando
// firebase deploy --only functions

