import passport from 'koa-passport'
import LocalStrategy from 'passport-local'
import UserModel from '../../dbs/models/users'

passport.use(new LocalStrategy(async function (username,password,done) {
    let where = {
      $or: [{username: username}, {phone: username}] //用户名或手机号登录
    }
    let result  = await UserModel.findOne(where)
    if (result !=null){
        console.log(result.password)
        console.log(password)
        if (result.password === password){

            return done(null,result)
        } else{
            return done(null, false,"password error")
        }
    }else{
        return done(null, false,"用户不存在")
    }

}))


passport.serializeUser(function (user,done) {

    done(null,user)
})


passport.deserializeUser(function (user,done) {
    return done(null,user)
})


export default  passport
