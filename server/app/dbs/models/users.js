import mongoose from 'mongoose'


const UserSchema = new mongoose.Schema({

    username:{
        type:String,
        unique:true,
        require:true
    },
    fullname:{
        type:String,
    },
    password:{
        type:String,
        require:true
    },
    email:{
        type:String
    },
    phone:{
      type:String
    },
    state:{
        type:Boolean
    },
    roles:{
        type:Array
    },
  timestamp:{
      type: Date,
    default: Date.now
    }

 })


export default  mongoose.model('User',UserSchema)
