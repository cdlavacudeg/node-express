import {addMessage as storeAdd,getMessage as storeGet, updateMessage as storeUpdate} from './store.js'

function addMessage(user,message) {
    console.log(`${user} : ${message}`)

    return new Promise((resolve,reject)=>{
        if(!user || !message){
            console.error('[messageController] No hay usuario o mensaje')
            return reject('Los datos son incorrectos')
        }
        const fullMessage={
            user:user,
            message:message,
            date: new Date(),
        }
        console.log(fullMessage)
        storeAdd(fullMessage)
        resolve(fullMessage)
    })
} 

function getMessage() {
    return new Promise((resolve,reject)=>{
        resolve(storeGet())
    })
}

function updateMessage(id,message){
    return new Promise(async (resolve,reject)=>{
        if(!id || !message){
            reject('Invalid data')
            return false
        }

        const result=await storeUpdate(id,message)
        resolve(result)
    })
}
export {addMessage,getMessage}
