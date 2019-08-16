import Permission from '../dbs/models/permission'

let permission = {

    add:async (ctx,next) =>{
      let {body:param,body:{code}} = ctx.request

        let result = await Permission.findOne({code})
        if (result){
          ctx.body={
            code:-1,
            msg:'识别码已存在'
          }
          return false
        }

        let newPermission = await Permission.create(param)
        if (newPermission){
          ctx.body = {
            code:0,
            msg:'添加成功',
            data:newPermission
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
    let upPermission = await  Permission.findOneAndUpdate({_id},param)
    console.log(upPermission)
    if (upPermission){
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
    let result = await  Permission.deleteOne({_id})

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
      let result = await Permission.find().skip((page_no-1)*page_size).limit(page_size).sort({timestamp:1})
      let total = await Permission.countDocuments()
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

export default permission
