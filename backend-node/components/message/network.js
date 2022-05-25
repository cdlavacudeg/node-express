import express from 'express'
import {success,error} from '../../network/response.js'
import {addMessage,getMessage,updateMessage,deleteMessage} from './controller.js'
const router=express.Router();

router.get('/',function (req,res) {
    const filterMessages=req.query.user || null;
    getMessage(filterMessages)
        .then((message)=>{
            success(req,res,message)
        })
        .catch(e=>{
            error(req,res,'Error Inesperado')
        })
})

router.delete('/:id',function (req,res) {
    deleteMessage(req.params.id)
        .then(()=>{
            success(req,res,`Usuario ${req.params.id} eliminado`)
        })catch(
            e=>{
                error(req,res,'Error intentando borrar mensaje')
            }
        )
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
