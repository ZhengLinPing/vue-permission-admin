const router = require('koa-router')()
import button from '../../app/controller/button'

router.prefix('/button')


router.post('/add', button.add)
router.post('/update', button.update)
router.post('/remove', button.remove)
router.post('/list', button.list)


module.exports = router
