const router = require('koa-router')()
import permission from '../../app/controller/permission'

router.prefix('/permission')


router.post('/add', permission.add)
router.post('/update', permission.update)
router.post('/remove', permission.remove)
router.post('/list', permission.list)


module.exports = router
