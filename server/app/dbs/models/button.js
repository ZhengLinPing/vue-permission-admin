import mongoose from 'mongoose'


const schema = new mongoose.Schema({
    code:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    desc:{
        type:String,
    },
    state:{
        type:Boolean
    },
    timestamp:{
      type: Date,
      default: Date.now
    }

 })


export default  mongoose.model('Button',schema)
