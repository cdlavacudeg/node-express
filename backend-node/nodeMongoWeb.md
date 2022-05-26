# Node.js: Base de datos con MongoDB y Websockets

# Conexiones hacia los servidores
[Repo](https://github.com/CodingCarlos/backend-node-platzi)
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

## Servir archivos estáticos
Mediante el uso de express -> `app.use('/app', express.static('public))` es posible servir los archivos estaticos de publicen la ruta que se especifica y usando las rutas de archivo de la carpeta public.

## Errores: Cómo presentarlos e implicaciones en la seguridad

Es muy importante tener en cuenta la información que se le va a brindar al usuario ya que el contenido del error puede dar pie a que se explote una vulnerabilidad del sistema.

---

# Arquitectura básica del backend en Node.js 

## Conceptualmente: Rutas, controladores y bases de datos

![Arquitectura](https://static.platzi.com/media/user_upload/diagrama-825e902b-0966-40f0-8231-65b99f7206c1.jpg) 

## Rutas y capa de red: Responsabilidad y límites

Rutas se manejan desde archivo en carpeta network para mantener más limpia app.js

## Controladores: Definiendo la lógica del negocio

Los controladores van a ser la base del procesamiento de los datos y la comunicación de la api, especificamos como vamos a añadir los datos, actualizarlos o borrarlos


## Almacenando la información en una base de datos

Se crea un archivo de practica para verificar que todo quede funcionando adecuadamente.

---

# Utilizar bases de datos para definir, moldear, almacenar y recuperar la información de nuestra aplicación

## Tipos de bases de datos

- **Bases de Datos Relacionales**: 
    
    No es una base de datos muy flexible, pero tiene a favor su gran soporte y el enorme desarrollo en herramientas para su uso. Si necesitamos cambiar un valor de un campo debemos hacerlo con todos los campos de nuestra BD, en cambio con NoSQL o No Relacional no es así.

    Como su nombre lo indica, utilizan el modelo relacional y siempre es mejor usarlas cuando los datos que vas a utilizar son consistentes y ya tienen una estructura planificada.

    - Las bases de datos relacionales funcionan bien con datos estructurados.
    - Las organizaciones que tienen muchos datos no estructurados o semiestructurados no deberían considerar una base de datos relacional.
    
    **Ejemplos**:

        - MySQL
        - Microsoft SQL Server
        - Oracle Database
        - PostgreSQL
        - IBM Db2

- **Bases de Datos No Relacionales**: 
    
    Son de bases de datos sin una tabla fija como las que sí se encuentran en las bases de datos relacionales, lo que permite una alta escalabilidad en ellas. Además, es abierta y, por lo tanto, flexible a diferentes tipos de datos y no necesita tantos recursos para ejecutarse; de hecho, el hardware necesario no cuesta mucho.

    A diferencia de las bases de datos relacionales, los datos de una base de datos NO-SQL (Not Only SQL) son más flexibles en cuanto a consistencia de datos y se han convertido en una opción que intenta solucionar algunas limitaciones que tiene el modelo relacional. Este tipo de bases de datos es excelente para las organizaciones que buscan almacenar datos no estructurados o semiestructurados.

    Una de las ventajas de las bases de datos NoSQL es que los desarrolladores pueden realizar cambios en la base de datos sobre la marcha, sin que ello afecte a las aplicaciones que la utilizan.

    **Ejemplos**:

        - MongoDB
        - Redis
        - Apache Cassandra
        - Apache CouchDB
        - CouchBase

## MongoDB: Almacenar leer y actualizar datos datos

Empleamos la libreria [mongoose](https://mongoosejs.com/) para realizar verificación de los datos que van a entra a la base de datos. Tener en cuenta que se puede usar un cluster de MongoDB Atlas para realizar las pruebas necesarias.

- `npm install mongoose`

---

# Entidades para crear aplicaciones escalables

Para escalar la arquitectura con multiples entidades empleamos las referencias de mongoose y el populate

```javascript
// message.model.js
user:{
        type:Scema.ObjectId,
        ref:'User'
    }
```

```javascript
// message.store.js 
const messages= new Model.find(filter)
    .populate('user')
    .exec((error,populated)=>{
            if(error){
                    reject(error)
                    return false
                }
        })

```

## Recibir ficheros desde NodeJs

```javascript
const multer= require('multer')

const upload=multer({
        dest:'uploads/'
    })

router.post('/',upload.single('file'),cb)

```

# Websockets
El protocolo Websocket o wss:// crea un túnel de información entre el usuario y el servidor el cual se quedará abierto hasta que el servidor y/o el cliente cierre la conexión para pedir información en tiempo real.
