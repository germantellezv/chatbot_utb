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

    var dependencias = ["RECTORÍA",
        "SECRETARÍA GENERAL",
        "ADMISIONES Y REGISTRO",
        "DIRECCIÓN DE PLANEACIÓN Y GESTIÓN DE LA CALIDAD",
        "DIRECCIÓN DE MERCADEO Y COMUNICACIONES",
        "JEFE DE VENTAS",
        "JEFE DE COMUNICACIONES",
        "JEFE DE PRENSA",
        "JEFE DE CONTACT CENTER",
        "DIRECCIÓN DE INTERNACIONALIZACIÓN",
        "VICERRECTORÍA ACADÉMICA",
        "FACULTAD DE INGENIERÍA",
        "PROGRAMA DE INGENIERÍA INDUSTRIAL",
        "PROGRAMA DE INGENIERÍA DE SISTEMAS",
        "PROGRAMAS DE INGENIERÍA MECÁNICA E INGENIERÍA MECATRÓNICA",
        "PROGRAMAS DE INGENIERÍA ELÉCTRICA E INGENIERÍA ELECTRÓNICA",
        "PROGRAMAS DE INGENIERÍA CIVIL E INGENIERÍA AMBIENTAL",
        "PROGRAMA DE INGENIERÍA QUÍMICA",
        "PROGRAMA DE INGENIERÍA NAVAL",
        "PROGRAMAS DE POSGRADOS DE LA FACULTAD DE INGENIERÍA",
        "PROFESIONALES DE POSGRADO DE LA FACULTAD DE INGENIERÍA",
        "PROGRAMA DE FINANZAS Y NEGOCIOS INTERNACIONALES",
        "PROGRAMA DE ADMINISTRACIÓN DE EMPRESAS",
        "PROGRAMA DE CONTADURÍA PÚBLICA",
        "PROGRAMA DE ECONOMÍA",
        "PROGRAMAS DE POSGRADOS DE LA FACULTAD DE ECONOMÍA Y NEGOCIOS",
        "FACULTAD DE CIENCIAS SOCIALES Y HUMANIDADES",
        "COORDINACIÓN DE HUMANIDADES",
        "CENTRO DE IDÍOMAS",
        "PROGRAMA DE PSICOLOGÍA",
        "PROGRAMA DE COMUNICACIÓN SOCIAL",
        "PROGRAMA DE CIENCIA POLÍTICA Y RELACIONES INTERNACIONALES",
        "PROGRAMA DE DERECHO",
        "CONSULTORIO JURÍDICO",
        "FACULTAD CIENCIAS BÁSICAS",
        "PROGRAMAS DE POSGRADOS DE LA FACULTAD DE CIENCIAS BÁSICAS",
        "FACULTAD DE EDUCACIÓN",
        "PROGRAMAS DE POSGRADOS DE EDUCACIÓN",
        "ESCUELA DE ESTUDIOS TÉCNICOS Y TECNOLÓGICOS",
        "EQUIPO UTB- COTA (CONVENIO UTB-EDUPOL)",
        "DIRECCIÓN DE INVESTIGACIÓN,INNOVACIÓN Y EMPRENDIMIENTO",
        "LABORATORIO DE CREATIVIDAD E INNOVACIÓN",
        "DIRECCIÓN DE EXCELENCIA DOCENTE Y APOYO AL APRENDIZAJE",
        "ASUNTOS PROFESIONALES",
        "APRENDIENDO A APRENDER",
        "ACOMPAÑAMIENTO ACADÉMICO",
        "MONITOREO ACADÉMICO E INVESTIGACIÓN",
        "TECNOLOGÍA APLICADA A LA EDUCACIÓN",
        "DIRECCIÓN DE BIENESTAR UNIVERSITARIO",
        "DESARROLLO PSICOSOCIAL",
        "OBSERVATORIO VIDA UNIVERSITARIA",
        "TALENTO Y ESPÍRITU UNIVERSITARIO",
        "DIRECCIÓN DE BIBLIOTECAS Y ARCHIVO",
        "ARCHIVOS Y CORRESPONDENCIA",
        "DIRECCIÓN FINANCIERA",
        "TESORERÍA",
        "CONTABILIDAD",
        "OFICINA DE APOYO FINANCIERO",
        "CONTROL PRESUPUESTAL Y FINANCIERO",
        "DIRECCIÓN DE SERVICIOS ADMINISTRATIVOS",
        "DEPARTAMENTO DE MANTENIMIENTO Y SERVICIOS GENERALES",
        "DEPARTAMENTO DE AUDIOVISUALES Y MULTIMEDIA",
        "DEPARTAMENTO DE UNIDADES DE SERVICIOS",
        "CAFETERÍA",
        "LIBRERÍA Y TIENDA UNIVERSITARIA",
        "DIRECCIÓN DE TECNOLOGÍAS DE INFORMACIÓN Y COMUNICACIÓN - TIC",
        "DEPARTAMENTO DE INFRAESTRUCTURA Y REDES",
        "DEPARTAMENTO DE SISTEMA DE INFORMACIÓN",
        "DEPARTAMENTO DE GESTIÓN DE SERVICIOS DE TECNOLOGÍAS E INFORMACIÓN",
        "DIRECCIÓN DE INFRAESTRUCTURA Y MEDIO AMBIENTE",
        "DIRECCIÓN DE GESTIÓN HUMANA",
        "DEPARTAMENTO DE COMPRAS Y CONTRATACIÓN",
        "DIRECCIÓN DE EXTENSIÓN",
        "DEPARTAMENTO DE ASESORÍAS,CONSULTORÍAS Y SERVICIOS TÉCNICOS - CAST",
        "DEPARTAMENTO DE PRÁCTICAS PROFESIONALES",
        "DEPARTAMENTO DE EGRESADOS",
        "FONDO UTB"]


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

    //Obenter datos de empleados por dependencia
    async function getExtensionbyDependencia(agent) {
        var dependencia = agent.parameters['dependencias']
        let citiesRef = db.collection('UTB');
        let query = await citiesRef.where('DEPENDENCIA', '==', `${dependencia}`).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    return console.log('No matching documents.');
                }
                var response = []
                snapshot.forEach(doc => {
                    response.push(`😀${doc.data()['NOMBRE']}\n☎️Extensión: ${doc.data()['EXTENSIÓN']}\n🤓Cargo: ${doc.data()['CARGO'].toLowerCase()}\n📧Correo: ${doc.data()['CORREO']}`)
                });
                agent.add(` `)
                agent.add(`En ${dependencia.toLowerCase()} te puedes contactar con:\n\n${response.join('\n\n')}`)
                return console.log('Success');
            })
            .catch(err => {
                agent.add('Lo siento, no he encontrado esa dependencia. Verifíca que la hayas escrito bien.')
                return console.log('Error getting documents', err);
            });
    }
    // Obtener datos de contacto de un empleado
    async function getExtensionbyEmpleado(agent) {
        var nombre = agent.parameters['empleados']
        let citiesRef = db.collection('UTB');
        let query = await citiesRef.where('NOMBRE', '==', `${nombre}`).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    return console.log('No matching documents.');
                }
                var response = []
                snapshot.forEach(doc => {
                    response.push(`😀${doc.data()['NOMBRE']}\n☎️Extensión: ${doc.data()['EXTENSIÓN']}\n 💼Dependencia: ${doc.data()['DEPENDENCIA'].toLowerCase()}\n🤓Cargo: ${doc.data()['CARGO'].toLowerCase()}\n📧Correo: ${doc.data()['CORREO']}`)
                });
                agent.add(`Esta es la información que tengo de ${nombre.toLowerCase()}:\n\n${response.join('\n\n')}`)
                return console.log('Success');
            })
            .catch(err => {
                agent.add('Lo siento, no he encontrado a nadie con ese nombre. Prueba colocando el primer nombre y primer apellido o el nombre completo.')
                return console.log('Error getting documents', err);
            });

    }




    let intentMap = new Map();
    intentMap.set('getExtensionbyEmpleado', getExtensionbyEmpleado);
    intentMap.set('getExtensionbyDependencia', getExtensionbyDependencia);
    intentMap.set('Contacto', mostrarContacto);
    intentMap.set('Eventos', mostrarEventos);
    agent.handleRequest(intentMap);
});
// Para efectuar los cambios en DialogFlow usar el siguiente comando
// firebase deploy --only functions

