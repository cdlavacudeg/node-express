import {addMessage as storeAdd,getMessage as storeGet, updateMessage as storeUpdate, deleteMessage as storeRemove} from './store.js'

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

function getMessage(filterUser) {
    return new Promise((resolve,reject)=>{
        resolve(storeGet(filterUser))
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

function deleteMessage(id) {
    return new Promise((resolve,reject)=>{
        if(!id){
            reject('Id invalido')
            return false
        }
        storeRemove(id)
            .then(()=>{
                resolve()
            })
            .catch(e=>{
                reject(e);
            })
    })
    
}
export {addMessage,getMessage,deleteMessage}
