const list=[];


function addMessage(message){
    list.push(message)
}

function getMessage() {
   return list
}

export {addMessage,getMessage}
