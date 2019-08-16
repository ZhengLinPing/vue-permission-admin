import Redis from 'koa-redis'
import Passport from './utils/passport'
import axios from './utils/axios'
import Config from '../dbs/config'
import User from '../dbs/models/users'
import Role from '../dbs/models/roles'

let users = {

    add:async (ctx,next) =>{
      let {body:param,body:{username}} = ctx.request

        let user = await User.findOne({username})
        if (user){
          ctx.body={
            code:-1,
            msg:'用户名已存在'
          }
          return false
        }

        let nuser = await User.create(param)
        if (nuser){
          delete nuser.password
          ctx.body = {
            code:0,
            msg:'添加成功',
            data:nuser
          }
          //调用登录
          /*let res = await axios.post('/user/login',{
                username,
                password,
            })
            if (res.data && res.data.code ===0){
                ctx.body = {
                    code:0,
                    msg:'添加成功',
                    data:res.data.user
                }
            }else{
                ctx.body = {
                    code:-1,
                    msg:res,
                }
            }*/

        }else{
            ctx.body = {
                code:-1,
                msg:'添加失败',
            }
        }
    },


  update:async (ctx,next) =>{
    let {body:param,body:{_id}} = ctx.request

    console.log('param',param.password)
    if (param.password===''){
      delete  param.password
    }
    let nuser = await  User.findOneAndUpdate({_id},param)
    console.log(nuser)
    if (nuser){
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
    let nuser = await  User.deleteOne({_id})
    console.log(nuser)
    if (nuser.deletedCount===1){
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
      phone
    }=ctx.request.body;
    let where = {}
    if (phone){
      where.phone=phone
    }
    try {
      let result = await User.find(where,'-password').skip((page_no-1)*page_size).limit(page_size).sort({timestamp:-1})
      let total = await User.countDocuments(where)
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
  },

    signIn:async (ctx,next) => {
        return Passport.authenticate('local',function (err,user,info,status) {

            if (err){
                ctx.body={
                    code:-1,
                    msg:err
                }
            } else{
                if (user){
                  delete user.password
                    ctx.body = {
                        code:0,
                        msg:'登录成功',
                        user,
                        data:{
                          token:'user-token',
                        }
                    }
                    return ctx.login(user)
                }else{
                    ctx.body={
                        code:1,
                        msg:info
                    }
                }
            }
        })(ctx, next)
    },

    logOut:async function(ctx){
        await ctx.logout()
        if (!ctx.isAuthenticated()){
            ctx.body = {
                code:0
            }
        } else{
            ctx.body={
                code:-1
            }
        }
    },

    getUserInfo:async (ctx)=>{
        if (ctx.isAuthenticated()){
            const {username,email,roles} = ctx.session.passport.user

             let per = await Role.findOne({'code':roles[0]},'permissions')
            ctx.body={
              code:0,
              data:{
                roles,
                permissions:per.permissions,
                avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
                name:username,
              }

            }
        }else{
            ctx.body = {
              code:-1,
                user:'',
                email:''
            }
        }
    }

}

export default users
