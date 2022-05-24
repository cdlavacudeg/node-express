const db = require('mongoose')
const Model=require('./model')
// mongodb://<dbuser>: <dbpassword>@ds255107....


db.Promise = global.Promise

db.connect('mongodb://...',{
    useNewUrlParser: true,
})

console.log('[db] Conectada con éxito')



function addMessage(message){
    const myMessage =new Model(message);
    myMessage.save();
}

async function getMessage() {
   const messages= await Model.find();
   return messages;
}

async function updateMessage(id,message){
    const foundMessage= await Model.findOne({
        _id:id,
    })
    foundMessage.message=message;
    
    const newMessage = await foundMessage.save();
    return newMessage;
}

export {addMessage,getMessage,updateMessage}
