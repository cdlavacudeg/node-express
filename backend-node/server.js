import express from 'express'
import bodyParser from 'body-parser'
import router from './network/routes.js'
import db from './db.js'

db('ulr de conexión')
var app=express()


app.use(bodyParser.json())

router(app)

app.use('/app',express.static('public'))

app.listen(3000,()=>{
    console.log(`aplicacicación escuchando en puerto 3000`)
})
