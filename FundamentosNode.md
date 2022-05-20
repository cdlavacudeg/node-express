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
---

# Módulos del core

## Globals

En node tonomas el objeto [**global**](https://nodejs.org/api/globals.html) que contieno las metodos y propiedades básicas que usamos en Node.js; ej (*setTimeOut*)


> **global** es un equivalente de **this** en el navegador

En node **this** es un alias de **global**

```javascript
this === global //true
console.log(global) //acceder a esta variable
```
Algunos metodos que se incluyen en el global objecto son:

- **setTimeOut**:se encarga de llamaraotra función despues de un periodo de tiempo.
- **setinterval**:llama a otra función cada intervalo de tiempo.
- **setImmediate**:EquivalenteasetTimeOut pero con tiempo 0.
- **clearTimeOut**:detiene un setTimeOut.
- **clearInterval**:detiene un setinterval.

## File system

El file system ([fs](https://nodejs.org/api/fs.html) provee una API para interactuar con el sistema de archivos cerca del estándar POSIX.
POSIX es el estándar para interfaces de comando y shell, las siglas las significan: “Interfaz de sistema operativo portátil” la X de POSIX es por UNIX.

El file system nos permite acceder archivo del sistema, leer, modificar., escribirlos, es muy útil para precompiladores, para lo que requiera hacer grabados de disco, o bases de datos en node requieren un uso intensivo de Node.Todo lo que hagamos con modulos por buenas prácticas son asincronos, pero tienen una version sincrona no recomendada pues pordría bloquear el event loop con más facilidad.

```javascript
const fs = require('fs');

function leer(ruta, cb) {
    fs.readFile(ruta, (err, data) => {
        cb(data.toString());
    })
}

function escribir(ruta, contenido, cb) {
    fs.writeFile(ruta, contenido, function (err) {
        if (err) {
            console.error('No he podido escribirlo', err);
        } else {
            console.log('Se ha escrito correctamente');
        }

    });
}

function borrar(ruta, cb) {
    fs.unlink(ruta, cb);
}

// escribir(__dirname + '/archivo1.txt', 'Soy un archivo nuevo', console.log);
// leer(__dirname + '/archivo1.txt', console.log)
borrar(__dirname + '/archivo1.txt', console.log);

```

## Console

Con [console](https://nodejs.org/api/console.html) podemos imprimir todo tipo de valores por nuestra terminal:

- `console.log`: recibe cualquier tipo y lo muestra en el consola.
- `console.info`: es equivalente a log pero es usado para informar.
- `console.error`: es equivalente a log pero es usado para errores.
- `console.warn`: es equivalente a log pero es usado para warning.
- `console.table`: muestra una tabla a partir de un objeto.
- `console.count`: inicia un contador autoincremental.
- `console.countReset`: reinicia el contador a 0.
- `console.time`: inicia un cronometro en ms.
- `console.timeEnd`: Finaliza el cronometro.
- `console.group`: permite agrupar errores mediante identación.
- `console.groupEnd`: finaliza la agrupación.
- `console.clear`: Limpia la consola.

## Errores (try/ catch)

Con Node podemos manejar los errores de una manera muy optima, pero primero debemos entender como Node maneja los errores por defecto.

Cuando sucede un error en Node, él por defecto terminara todo el proceso de nuestro código para avisar que ha ocurrido un error, 
esto puede ser fatal para nuestros proyectos, los errores además se notifican por hilos, es decir, que si un error 
sucede en el hilo principal del event loop, es decir, el evento queue, el error se avisara desde este mismo hilo, 
pero si un error sucede antes desde otro hilo como el hilo de las funciones asíncronas, el error se avisara desde 
aquel hilo sin dejar mostrar el error del hilo principal.

Nosotros podemos manejar este flujo de errores para que Node no se detenga al momento de que ocurra uno y 
lo podamos manejar según nuestros deseos, para esto usamos try y catch. 
Siendo try el bloque de código que ejecutara la función que puede o no fallar y siendo catch la función que atrapara el error y le especificaremos que hacer con él.

```javascript
try {
  itsBroken();
} catch (error) {
  console.log(error.message);
}

//--

try {
  throw'myException'; // generates an exception
}
catch (err) {
  // statements to handle any exceptions
  logMyErrors(err);    // pass exception object to error handler
}
finally{
	cerrarArchivo() 
}
```

## Procesos hijo

El módulo de procesos secundarios de Node.js ([child\_process](https://nodejs.org/api/child_process.html)) tiene dos funciones spawn y exec, mediante las cuales podemos iniciar un proceso secundario para ejecutar otros programas en el sistema.

La diferencia más significativa entre `child_process.spawn` y `child_process.exec` está en que *spawn* devuelve un stream y *exec* devuelve un buffer.

- Usa spawn cuando quieras que el proceso hijo devuelva datos binarios enormes a Node.
- Usa exec cuando quieras que el proceso hijo devuelva mensajes de estado simples.
- Usa spawn cuando quieras recibir datos desde que el proceso arranca.
- Usa exec cuando solo quieras recibir datos al final de la ejecución.

## Módulos nativos en C++

Poder usar algunos módulos de C++ desde Node.js. [Documentación](https://nodejs.org/api/addons.html)

## HTTP 

Node nos ofrece el modulo [HTTP](https://nodejs.org/api/http.html) el cual nos permite principalmente crear un servidor en nuestro computador.
En este modulo encontraremos todo lo necesario que necesitamos para crear un sistema de rutas, que responderá cada ruta, los header que podrá mandar, etc.
Uno de los métodos principales de este modulo es createServer, el cual nos permitirá abrir un puerto para crear el servidor.

```javascript
const http=require('http')

http.createServer((req,res)=>{
  console.log('Nueva petición!')
  console.log(req.url)
  
  switch (req.url) {
    case '/hola':
      res.write('Hola, mundo probando '+req.url)
      res.end()
      break;

    default:
      res.write('Error 404: No se encuentra la pagina')
      res.end()
      break;
  }
  //res.writeHead(201, { 'content-type': 'text/html; charset=utf-8'})
  
  //Respuesta al usuario
  //res.write('Hola, HTTP Node.js')

  //res.end()
}).listen(3000)

console.log('Escuchando en puerto:3000')
```
## OS

El módulo [os](https://nodejs.org/api/os.html) permite acceder a elementos de muy bajo nivel del sistema operativo, y es útil en diferentes contextos.

```javascript
const os = require('os')

// Architecture
console.log('Architecture:')
console.log(os.arch())
console.log('')

// Platform
console.log('Platform:')
console.log(os.platform())
console.log('')

// cpus
console.log('cpus')
console.log(os.cpus().length)
console.log('')

// Errores y señales del sistema
console.log('Erros and signals of the system')
console.log(os.constants)
console.log('')

// Function to convert from bytes to kbytes, mbytes and gbytes
const SIZE = 1024

kb = bytes => { return bytes / SIZE }
mb = bytes => { return kb(bytes) / SIZE }
gb = bytes => { return mb(bytes) / SIZE }

// Total Ram Memory
console.log('Total Ram Memory:')
console.log(`${os.totalmem()} bytes`)
console.log(`${kb(os.totalmem)} kb`)
console.log(`${mb(os.totalmem)} mb`)
console.log(`${gb(os.totalmem)} gb`)
console.log('')

// Free memory we have in bytes units
console.log('Free memory we have in kbytes units')
console.log(`free Ram memory: ${os.freemem()} bytes`)
console.log(`free Ram memory: ${kb(os.freemem())} kb`)
console.log(`free Ram memory: ${mb(os.freemem())} mb`)
console.log(`free Ram memory: ${gb(os.freemem())} mb`)
console.log('')


// Directory for the user root
console.log('Directory for the user root')
console.log(os.homedir())
console.log('')

// Directory for temporal files
console.log('Directory for temporal files')
console.log(os.tmpdir())
console.log('')

// Hostname of a server:
console.log('Hostname of any server')
console.log(os.hostname())
console.log('')

// Actived Network interfaces right now
console.log('Network Interfaces right now')
console.log(os.networkInterfaces())
console.log('')
```
## Process 

Podremos entender y ver qué pasa con el [process](https://nodejs.org/api/process.html) actual de Node.js, podremos escuchar señales, escuchar lo que necesitemos y después hacer cosas con ellos.

```javascript

//const process=require('process')

process.on('beforeExit', ()=>{
  console.log('El proceso va a terminar')
})

process.on('exit',()=>{
  console.log('El proceso ha finalizado')
})

process.on('uncaughtException',(err,origen)=>{
  console.error('Se ha olvidado capturar un error')
  console.error(err)
})

//process.on('unhandledRejection') // Promesas 
random_func()
```

# Links

- [Node.js about](https://nodejs.org/en/about/)
