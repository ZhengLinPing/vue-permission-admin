import mongoose from 'mongoose'


const PermissionSchema = new mongoose.Schema({
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
    permission:{
        type:Array
    },
  timestamp:{
    type: Date,
    default: Date.now
  }

 })


export default  mongoose.model('Permission',PermissionSchema)
