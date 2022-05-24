import {addMessage as storeAdd,getMessage as storeGet} from './store.js'

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
export {addMessage,getMessage}
