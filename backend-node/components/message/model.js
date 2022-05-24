import monngoose =require('mongoose');

const Schema = mongoose.Schema;

const mySchema= new Schema({
    user: String,
    message:{
        type:Strnig,
        required: true,
    },
    date:Date,
});

export default model= mongoose.model('Message',mySchema);
