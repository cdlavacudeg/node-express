import express from 'express'
import bodyParser from 'body-parser'



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
    res.status(201).send({'eror':'ninguno'})
})

router.delete('/messague',function (req,res) {
    console.log(req.body)
    console.log(req.query)
    res.send('Eliminando mensajes')
})


app.listen(3000,()=>{
    console.log(`aplicacicación escuchando en puerto 3000`)
})
