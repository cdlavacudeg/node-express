import express from 'express'
import {success,error} from '../../network/response.js'

const router=express.Router();

router.get('/',function (req,res) {
    // headers
    console.log(req.headers)
    res.header({
        "custom-header":"Nuestro valor personalizado"
    })

    success(req,res,"Lista de mensajes")
})

router.delete('/',function (req,res) {
    console.log(req.body)
    console.log(req.query)
    success(req,res,'Mensajes eliminandos adecuadamente')
})

export default router 
