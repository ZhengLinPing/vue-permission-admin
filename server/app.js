// const Koa = require('koa')
import Koa from 'koa'
const app = new  Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const routes = require('./routes/index')

import mongoose from 'mongoose'
import Redis from 'koa-redis'
import session from 'koa-generic-session'
import passport from './app/controller/utils/passport'
import dbConfig from './app/dbs/config'




// error handler
onerror(app)

app.keys = ['gw','keyskeys']
app.proxy =true

app.use(session({
  key:'gw',
  prefix:'gw:uid',
  store:new Redis()
}))

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())

mongoose.connect(dbConfig.dbs, {
  useCreateIndex: true,
  useNewUrlParser:true,
  useFindAndModify:false
})

app.use(passport.initialize())
app.use(passport.session())

app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
routes(app)


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
