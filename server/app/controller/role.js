import Role from '../dbs/models/roles'

let role = {

    add:async (ctx,next) =>{
      let {body:param,body:{code}} = ctx.request

        let result = await Role.findOne({code})
        if (result){
          ctx.body={
            code:-1,
            msg:'识别码已存在'
          }
          return false
        }

        let newRole = await Role.create(param)
        if (newRole){
          ctx.body = {
            code:0,
            msg:'添加成功',
            data:newRole
          }
        }else{
            ctx.body = {
                code:-1,
                msg:'添加失败',
            }
        }
    },

  update:async (ctx,next) =>{
    let {body:param,body:{_id}} = ctx.request
    console.log(_id)
    let upRole = await  Role.findOneAndUpdate({_id},param)
    console.log(upRole)
    if (upRole){
      ctx.body = {
        code:0,
        msg:'更新成功',
      }
    }else {
      ctx.body = {
        code:-1,
        msg:'更新失败',
      }
    }
  },

  remove:async (ctx,next) =>{
    let {body:param,body:{_id}} = ctx.request
    let result = await  Role.deleteOne({_id})

    if (result.deletedCount===1){
      ctx.body = {
        code:0,
        msg:'删除成功',
      }
    }else {
      ctx.body = {
        code:-1,
        msg:'删除失败',
      }
    }
  },

  list:async (ctx,next) =>{
    const {
      page_no,
      page_size,
    }=ctx.request.body;
    try {
      let result = await Role.find().skip((page_no-1)*page_size).limit(page_size).sort({timestamp:1})
      let total = await Role.countDocuments()
      ctx.body={
        code:0,
        data:{
          items:result,
          total
        }
      }

    }catch (e) {
      ctx.body={
        code:0,
        msg:'服务错误',
        data:e
      }
    }
  }


}

export default role
