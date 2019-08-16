const common = require('./common')
const users = require('./models/users')
const permission = require('./models/role')
const role = require('./models/permission')
module.exports = function (app){
    app.use(common.routes(),common.allowedMethods());
    app.use(users.routes(),users.allowedMethods());
    app.use(permission.routes(),permission.allowedMethods());
    app.use(role.routes(),role.allowedMethods());
};



