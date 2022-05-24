import express from 'express'
import {success,error} from '../../network/response.js'
import {addMessage,getMessage,updateMessage} from './controller.js'
const router=express.Router();

router.get('/',function (req,res) {
    getMessage()
        .then((message)=>{
            success(req,res,message)
        })
        .catch(e=>{
            error(req,res,'Error Inesperado')
        })
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

router.patch('/:id',(req,res)=>{
    updateMessage(req.params.id,req.body.text)
        .then((data)=>{
            success(req,res,'Actualizado Correctamente')
        })
        .catch(e=>{
            error(req,res,'Error interno')
        })
})
export default router 
