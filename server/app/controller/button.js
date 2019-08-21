import Button from '../dbs/models/button'

let controller = {

    add:async (ctx,next) =>{
      let {body:param,body:{code}} = ctx.request

        let result = await Button.findOne({code})
        if (result){
          ctx.body={
            code:-1,
            msg:'识别码已存在'
          }
          return false
        }

        let newButton = await Button.create(param)

      if (newButton){
          ctx.body = {
            code:0,
            msg:'添加成功',
            data:newButton
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
    let upButton = await  Button.findOneAndUpdate({_id},param)
    console.log(upButton)
    if (upButton){
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
    let result = await  Button.deleteOne({_id})

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
      let result = await Button.find().skip((page_no-1)*page_size).limit(page_size).sort({timestamp:1})
      let total = await Button.countDocuments()
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

export default controller
