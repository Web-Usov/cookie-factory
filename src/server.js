const express = require('express')
const path = require('path')
const db = require('./db')
const bodyParser = require('body-parser')
const session = require('express-session')

const routers = require('./routers')
const api = require('./api')
const { PORT } = require('./config')

const app = express()

const sessionMiddleware  = session({
    secret:"topSecrets",
    resave: false,
    saveUninitialized: true
})


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(sessionMiddleware)
app.use(express.static(path.join(__dirname,'../', 'public')));

routers(app)

api(app)

app.get('/*', (req,res) => {
    res.redirect('/')
})


db().then(info => {
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`);    
  
    app.listen(PORT, () => {
        console.log("Server running")    
    })
    
  }).catch(() => {
    console.error('Unable to connect to database :(')  
})



