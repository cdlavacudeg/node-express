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


# Links

- [Node.js about](https://nodejs.org/en/about/)
