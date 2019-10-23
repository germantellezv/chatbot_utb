
/* var nombre = []
nombre += nombre + 'G'
console.log(nombre);
 */

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