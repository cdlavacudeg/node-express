# Curso de Fundamentos de Node.js

## Orígenes y filisofía

NodeJS es un entorno de ejecución de JavaScript fuera del navegador. Se crea en 2009, orientado a servidores. Es muy importante que esté fuera del navegador debido a que ya no es necesario un navegador web para ejecutar código JavaScript.

Características principales de JavaScript:

  - **Concurrencia**: Es monohilo, con entradas y salidas asíncronas.

  - **Motor V8**: Creado por Google en 2008 para Chrome. Escrito en C++. Convierte JS en código máquina en lugar de interpretarlo en tiempo real.

  - Todo funciona en base a **Módulos**, que son piezas de código muy pequeñas que modularizan nuestros sistemas y ayudan a entender mejor el código.

  - Orientación a **Eventos**, existe un bucle de eventos que se ejecuta constantemente. Lo que nos permite programar de forma reactiva, lo que quiere decir que podemos programar con la lógica de “Cuando sucede algo, se ejecuta esta parte de mi código y eso a su vez dispara otra parte”.

## EventLoop: asíncronia par diseño 

- ¿Qué es el Event Loop? Un proceso con un **bucle** que gestiona, de forma asíncrona, todos los eventos de una aplicación.

- *Event Queue*: Contiene todos los eventos que se generan por nuestro código (Funciones, peticiones, etc.), estos eventos quedan en una cola que van pasando uno a uno al Event Loop.

- *Event Loop*: Se encarga de resolver los eventos ultra rápidos que llegan desde el Event Queue. En caso de no poder resolverse rápido, enviá el evento al Thread Pool.

- *Thread Pool*: Se encarga de gestionar los eventos de forma asíncrona. Una vez terminado lo devuelve al Event Loop. El Event Loop vera si lo pasa a Event Queue o no.

## Monohilo: implicaciones en diseño y seguridad

El hecho de que sea monohilo lo hace delicado en el sentido de que puede ejecutarse algo que corte el código y detenga el programa, como la ausencia de sintaxis o una variable pendiente por definir.

[Aquí](https://nodejs.org/en/blog/vulnerability/february-2020-security-releases/) se pueden ver los problemas de seguridad y los Updates en este tema.

## Variables de entorno

Todas las variables de entorno por buenas practicas se ponen en mayusculas.
```javascript
//entorno.js
let nombre = process.env.NOMBRE || 'Sin nombre'
let web = process.env.WEB || 'Sin web'
console.log('Hola' + nombre +'tu web es' + web)

```

```bash
NOMBRE=Carlos node entorno.js
```
Imprime `Hola Carlos tu web es Sin web`

## Herramientas útiles

- **Nodemon** es una utilidad que monitorea los cambios en algún archivo y reinicia automaticamente el servidor.Es un demonio (proceso que está ejecutandose continuamente). `npm install -g nodemon`

- **PM2** Parecido a nodemon pero para producción `npm install -g pm2`

---
# Cómo manejar la asincronía

## Callbacks 

Una funcion **callback** es una funcion que es pasada como argumento a otra funcion, para ser llamada(called back) en otro momento.

La funcion que recibe como argumento otras funciones es denominada funcion de orden superior (higher-order function), esta contiene la logica correspondiente para ejecutar adecuadamente la funcion callback.

```javascript
//La asincronia se puede generar mediante en setTimeout

console.log('Iniciando proceso...');

function soyAsincrono(elCallback) {
    console.log("Asigno setTimeout para volver asincrona una función como esta misma: \n " + soyAsincrono);
    setTimeout(function(){
    console.log("Pasaron 3 segundos y me ejecuté");
    elCallback();
    }, 3000)
};

soyAsincrono(function(){console.log("Después de esto demuestro que Soy el primer Callback")});


function hola(nombre, miCallback) {
    setTimeout(function () {
        console.log('Hola, '+ nombre);
        miCallback(nombre);
    }, 1500);
}

function adios(nombre, otroCallback) {
    setTimeout(function() {console.log('Adios', nombre); otroCallback();}, 5000);
}


hola('Alejandro', function (nombre) {
    adios(nombre, function() {
        console.log('Terminando proceso...');
    });
});

hola('Alejandro estás probando  "hola" las funciones independientemente, las pasas vacías', function () {});
adios('Alejandro estás probando "adios" las funciones independientemente, las pasas vacías', function () {});

```

## Callback Hell: refractorizar o sufrir

Los callback Hell se dan cuando se pasa una función como parámetro que a su vez llama a otra función como parámetro, y así hasta n.
Una estrategia para trabajar con estas estructuras lógicas tan monolíticas es usar estructuras de control y funciones recursivas.

Las funciones recursivas se llaman así mismas y mediante la estructura de control le digo cuantas veces voy a necesitar llamar la función así misma.


```javascript
//callbackhell.js

function hola(nombre, miCallback) {
    setTimeout(function () {
        console.log('Hola, '+ nombre);
        miCallback(nombre);
    }, 1500);
}

function hablar(callbackHablar) {
    setTimeout(function() {
        console.log('Bla bla bla bla...');
        callbackHablar();
    }, 1000);
}

function adios(nombre, otroCallback) {
    setTimeout(function() {
        console.log('Adios', nombre);
        otroCallback();
    }, 1000);
}

//En esta parte del código se usan funciones recursivas y mediante un If como estructura de control le digo que cantidad de veces va a  ejectuarse la funcion hablar.

function conversacion(nombre, veces, callback) {
    if (veces > 0) {
        hablar(function () {
          conversacion(nombre, --veces, callback);
        })
    } else {
        adios(nombre, callback);
    }
}

// --

console.log('Iniciando proceso...');
hola('Aleajandro-sin', function (nombre) {
    conversacion(nombre, 10, function() {
        console.log('Proceso terminado');
    });
});

/****************HELL**********************/
// hola('Alejandro', function (nombre) {
//     hablar(function () {
//         hablar(function () {
//             hablar(function () {
//                 adios(nombre, function() {
//                     console.log('Terminando proceso...');
//                 });
//             });
//         });
//     });
// });

```
## Promesas

```javascript

function hola(nombre) {
    return new Promise(function(resolve,reject){
        setTimeout(function () {
            console.log('Hola, '+ nombre);
            resolve(nombre);
            }, 1500);
    });
}

function hablar(nombre) {
    return new Promise ((resolve,reject)=>{
      setTimeout(function() {
        console.log('Bla bla bla bla...');
        resolve();
        //reject(); -> generar un error para probar catch
      }, 1000);
    })
}

function adios(nombre) {
    return new Promise((resolve,reject)=>{
        setTimeout(function() {
            console.log('Adios', nombre);
            resolve();
            }, 1000);
      });
}

// ---

console.log('Iniciando el proceso..');

hola('Cristian')
  .then(hablar)
  .then(hablar)
  .then(hablar)
  .then(hablar)
  .then(hablar)
  .then(hablar)
  .then(adios)
  .then((nombre) => {
    console.log('Terminado el proceso');
  })
  .catch(error=>{
    console.error('Se generó un error');
    console.error(error)
  })
```

## Async/ await

```javascript
async function hola(nombre) {
    return new Promise(function(resolve,reject){
        setTimeout(function () {
            console.log('Hola, '+ nombre);
            resolve(nombre);
            }, 1500);
    });
}

async function hablar(nombre) {
    return new Promise ((resolve,reject)=>{
      setTimeout(function() {
        console.log('Bla bla bla bla...');
        resolve();
        //reject(); -> generar un error para probar catch
      }, 1000);
    })
}

async function adios(nombre) {
    return new Promise((resolve,reject)=>{
        setTimeout(function() {
            console.log('Adios', nombre);
            resolve();
            }, 1000);
      });
}

// ---
async function main(){
  let nombre = await hola('Cristian');
  await hablar();
  await hablar();
  await hablar();
  await hablar();
  await adios(nombre);
}

console.log('Empezamos e proceso');
main();
console.log('Termina el proceso');

```

# Links

- [Node.js about](https://nodejs.org/en/about/)
