const db = require('mongoose')
db.Promise = global.Promise

// mongodb://<dbuser>: <dbpassword>@ds255107....
function connect(url){
    db.connect(url,{
        useNewUrlParser: true,
    })
    console.log('[db] Conectada con éxito')
}

module.exports=connect
