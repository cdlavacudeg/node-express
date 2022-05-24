import express from 'express'
import {success,error} from '../../network/response.js'
import {addMessage} from './controller.js'
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

router.post('/',(req,res)=>{
    addMessage(req.body.user,req.body.message)
        .then(()=>{
            success(req,res,'Creado correctamente')
        })
        .catch(e=>{
            error(req,res,'Error Inesperado')
        })
})
export default router 
