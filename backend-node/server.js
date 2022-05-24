import express from 'express'
import bodyParser from 'body-parser'
import {success,error} from './response.js'


const router=express.Router()
var app=express()

app.use(bodyParser.json())
app.use(router)

router.get('/messague',function (req,res) {
    // headers
    console.log(req.headers)
    res.header({
        "custom-header":"Nuestro valor personalizado"
    })

    // void response
    // res.status(201).send()
    
    // Respuesta plana 
    //res.send('Lista de mensajes')

    // Respuesto con objetos
    //res.status(201).send({'eror':'ninguno'})
    success(req,res,"Lista de mensajes")
})

router.delete('/messague',function (req,res) {
    console.log(req.body)
    console.log(req.query)
    success(req,res,'Mensajes eliminandos adecuadamente')
})

app.use('/app',express.static('public'))

app.listen(3000,()=>{
    console.log(`aplicacicación escuchando en puerto 3000`)
})
