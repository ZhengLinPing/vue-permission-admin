export default {
     dbs:'mongodb://127.0.0.1:27017/koa',
    redis:{
        get host(){
            return '127.0.0.1'
        },
        get port(){
            return 6379
        }
    },

    get code(){
        return ()=>{
            return Math.random().toString(16).slice(2,6).toUpperCase()
        }
    },
    get expires(){
        return ()=>{
            return new Date().getTime()+60*60*1000 
        }
    }
}
