const router = require('koa-router')()
import role from '../../app/controller/role'

router.prefix('/role')


router.post('/add', role.add)
router.post('/update', role.update)
router.post('/remove', role.remove)
router.post('/list', role.list)


module.exports = router
