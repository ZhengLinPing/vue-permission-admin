import mongoose from 'mongoose'


const RolesSchema = new mongoose.Schema({

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
  permissions:{
    type:Array
  },
  timestamp:{
    type: Date,
    default: Date.now
  }


 })


export default  mongoose.model('Role',RolesSchema)
