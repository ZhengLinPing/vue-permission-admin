const router = require('koa-router')()
import users from '../../app/controller/user'

router.prefix('/user')

router.post('/login', users.signIn)
router.post('/logout', users.logOut)
router.post('/info', users.getUserInfo)
router.post('/add', users.add)
router.post('/update', users.update)
router.post('/remove', users.remove)
router.post('/list', users.list)



module.exports = router
