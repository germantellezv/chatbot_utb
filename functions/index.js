'use strict';

const functions = require('firebase-functions');
const { WebhookClient } = require('dialogflow-fulfillment');
const { Card, Suggestion } = require('dialogflow-fulfillment');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
let db = admin.firestore();
// Para hacer scraping
// var request = require('request-promise');
// const cheerio = require('cheerio');
// Fin scraping

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    // --- INICIO --- //

    var nombre = 'German';

    const saludos = [`Hola! Soy Aurora. ¿Cómo te puedo ayudar?`,
        `Hola cerebrito ¿Cómo te puedo ayudar?`,
        `Hola, qué gusto saludarte!. Cuéntame, ¿Cómo te puedo ayudar?`,
        `Wow! Qué bien te ves. Cuéntame, ¿En que te puedo ayudar?`];
    const msgListHorarios = [`Te puedo mostrar los horarios de semilleros, monitorías
 	y los horarios de atención de los profesores. ¿Con cuál te gustaría comenzar?`,
        `Tengo horario de semilleros, monitorías y el de profesores, ¿Cual te interesa conocer?`];


    // --- fin --- //
    const agent = new WebhookClient({ request, response });
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

    // Funcion para elegir aleatoriamente
    function choose(saludos) {
        var index = Math.floor(Math.random() * saludos.length);
        return saludos[index];
    }

    function opcionesIniciales(agent) {
        agent.add(`${choose(saludos)}`);
        agent.add(new Suggestion('Horarios'));
        agent.add(new Suggestion('Información'));
        agent.add(new Suggestion('Eventos'));
    }

    function mostrarEventos(agent) {
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
    }

    function listaDeHorarios(agent) {
        agent.add(`${choose(msgListHorarios)}`);
        agent.add(new Suggestion('Semilleros'));
        agent.add(new Suggestion('Monitorías'));
        agent.add(new Suggestion('Profesores'));
    }


    async function mostrarSemilleros(agent) {
        let datos = await db.collection('horarioSemilleros').doc('IA').get().then(doc => {
            agent.add(`Semillero de ${doc.data().nombre} a cargo del profesor ${doc.data().profesor}. ${doc.data().description}`);
            return console.log(doc.data().profesor);
        }).catch(err => {
            return console.log('Error', err);
        });
    }

    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', opcionesIniciales);
    intentMap.set('Lista de Horarios', listaDeHorarios);
    intentMap.set('Eventos', mostrarEventos);
    intentMap.set('Horario semillero', mostrarSemilleros);
    agent.handleRequest(intentMap);
});
// Para efectuar los cambios en DialogFlow usar el siguiente comando
// firebase deploy --only functions