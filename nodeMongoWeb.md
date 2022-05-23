# Node.js: Base de datos con MongoDB y Websockets

# Conexiones hacia los servidores

## ¿Qué son y cómo se usan las peticiones HTTP?

HTTP es el protocolo de comunicación que permite las transferencias de información en la web.

- **Importancia**: Al ser un protocolo es algo que se va a usar comúnmente (lenguaje común)
- **¿Cómo es una petición?**:
  ```
  GET /index.html HTTP/1.1
  Host: www.example.com
  Referer: www.google.com
  User-Agent: Mozilla/5.0
  Connection: keep-alive
  ```
- **Puntos clave**:
  - Métodos: Qué quieres hacer
  - Estado: Cómo ha ido la operación
  - Cuerpo: Lo que devuelve el servidor

## Métodos, Cabeceras y estados

- **Metodos**:

  - *GET*: Recoger información del servidor.
  - *POST*: Añadir información al servidor.
  - *PUT*: Reemplazar información en el servidor.
  - *PATCH*: Actualizar parte de la información.
  - *DELETE*: Eliminar información del servidor.
  - *OPTIONS*: Pedir información sobre métodos (saber si podemos ejecutar alguno de los métodos anteriores).

- **Cabeceras**: Información contextual de lo petición, cómo queremos hacer la petición.
  - *Cookies*
  - *Cors* : Cross Origin Resource Sharing, Manejar información desde fuera de nuestro servicio
  - *Accept*: Define el contenido que acepta
  - *Authorization*: Asegurate de que puedes pedir cosas al servidor
  - *Cache*: Almacenamiento temporal

- **Estados** son números que indica el estado de la petición:

  - `2XX`: Todo ha ido bien.
  - `3XX`: La petición se ha redirigido.
  - `4XX`: Errores del cliente.
  - `5XX`: Ha habido un error al procesar la petición.

## Cuerpo y query de la petición

- **Cuerpo**: La información de la petición. Los datos del usuario que quieres añadir.
  - *Content-type*: 
    - text/html
    - text/css 
    - application/javascript
    - image/jpeg
    - application/json
    - application/xml
  - *Content-length*
    
- **Query**: Información extra para el servidor que se encuentra en la URL de la pagina `?utm_source=medium`, `color=red & source=yahoo`
 