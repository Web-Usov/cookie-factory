
const path = require('path')

module.exports = (app) =>{
    app.get('/', (req,res) => {
        res.sendFile(path.join(__dirname,'../', 'public', 'index.html'))
    })
    app.get('/storage', (req,res) => {
        if(!req.session.user) return res.redirect('/login')
        res.sendFile(path.join(__dirname,'../', 'public', 'storage.html'))
    })
    app.get('/recipes', (req,res) => {
        if(!req.session.user) return res.redirect('/login')
        res.sendFile(path.join(__dirname,'../', 'public', 'recipes.html'))
    })
    app.get('/login', (req,res) => {
        res.sendFile(path.join(__dirname,'../', 'public', 'login.html'))
    })


}