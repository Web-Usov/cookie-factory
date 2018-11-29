const User = require('./models/user')
const Item = require('./models/item')
const Recipe = require('./models/recipe')




module.exports = (app) => {
    app.get('/api/storage', (req,res) => {      
        if(!req.session.user) return  res.redirect('/')      
        Item.find({}, (error, items) => {
            if(error) return res.json({error:error.message})
            
            res.json({error:null, items})

        })
    })
    app.get('/api/storage/item', (req,res) => {      
        if(!req.session.user) return  res.redirect('/')      
        const {id} = req.body
        Item.findById(id, (error, item) => {
            if(error) return res.json({error:error.message})
            if(!item) return res.json({error:'Item not found'})
            
            res.json({error:null, item})

        })
    })
    
    app.post('/api/storage/item', (req,res) => {      
        console.log(req.body);
        
        if(!req.session.user) return  res.redirect('/')      
        const {name,count} = req.body
        Item.create({name,count:Number(count)}, (error, item) => {
            if(error) return res.json({error:error.message})            
            res.json({error:null, item})
        })
    })

    app.put('/api/storage/item', (req,res) => {      
        if(!req.session.user) return  res.redirect('/')      
        const {id,name,count} = req.body
        Item.findByIdAndUpdate(id,{$set:{name,count}},{new:true},(error, item) => {
            if(error) return res.json({error:error.message})            
            res.json({error:null, message:item})
        })
    })

    app.delete('/api/storage/item', (req,res) => {      
        if(!req.session.user) return  res.redirect('/')      
        const {id} = req.body
        console.log(id);
        
        Item.findByIdAndDelete(id, (error, result) => {
            console.log(error,result);
            
            if(error) return res.json({error:error.message})
            res.json({
                error:null,
                message:"Delete OK"
            })
        })
    })

    
    
    app.get('/api/recipes', (req,res) => {      //TODO
        if(!req.session.user) return  res.redirect('/')      
        Recipe.find({}, (error, recipe) => {
            if(error) return res.json({error:error.message})
            
            res.json({error:null, recipe})

        })
    })
    app.get('/api/recipes/item', (req,res) => {      
        if(!req.session.user) return  res.redirect('/')      
        const {id} = req.body
        Recipe.findById(id, (error, recipe) => {
            if(error) return res.json({error:error.message})
            if(!recipe) return res.json({error:'Recipe not found'})
            
            res.json({error:null, recipe})

        })
    })
    
    app.post('/api/recipes/item', (req,res) => {      
        console.log(req.body);
        
        if(!req.session.user) return  res.redirect('/')      
        const {name,ingreds} = req.body
        Recipe.create({name,ingreds}, (error, recipe) => {//TODO
            if(error) return res.json({error:error.message})            
            res.json({error:null, recipe})
        })
    })

    app.put('/api/recipes/item', (req,res) => {    //TODO  
        if(!req.session.user) return  res.redirect('/')      
        const {id,name,count} = req.body
        Recipe.findByIdAndUpdate(id,{$set:{name,count}},{new:true},(error, recipe) => {
            if(error) return res.json({error:error.message})            
            res.json({error:null, message:recipe})
        })
    })

    app.delete('/api/recipes/item', (req,res) => {      //TODO
        if(!req.session.user) return  res.redirect('/')      
        const {id} = req.body
        console.log(id);
        
        Recipe.findByIdAndDelete(id, (error, recipe) => {
            
            if(error) return res.json({error:error.message})
            res.json({
                error:null,
                message:recipe
            })
        })
    })

    



    app.get('/api/auth', (req,res) => {
                
    })
    app.get('/api/auth/getUser', (req,res) => {
        res.json({error:null, user:req.session.user})
    })
    app.post('/api/auth/login', (req,res) => {
        
        if(req.session.user) return  res.redirect('/')
        const {name, password} = req.body
        // console.log(req.body);
        
        User.findOne({
            name,
            password
        },{password:false}, (error, user) => {
            if(error) return res.json({error:error.message})
            if(!user) return res.json({error:"User not found"})
            req.session.user = user
            res.json({
                error:null,
                user
            })
        })

    })
    app.get('/api/auth/logout', (req,res) => {
        
        if(!req.session.user) return  res.redirect('/')
        req.session.user = null;
        res.json({error:null, message:"Logout ok"})
    })
    app.post('/api/auth/signup', (req,res) => {

        if(req.session.user) return  res.redirect('/')
        const {name, password, isAdmin} = req.body
        
        const group = isAdmin === 'true' ? 'admin' : 'user'
        User.create({name,password,group}, (error,user) => {
            if(error) return res.json({error:error.message})
            res.json({
                error:null,
                message:"SignUp OK"
            })

        })
    })
    app.delete('/api/auth/delete', (req,res) => {
        // console.log(req.body);

        if(!req.session.user) return  res.redirect('/')
        User.findByIdAndDelete(req.session.user._id, (error,user) => {
            if(error) return res.json({error:error.message})
            req.session.user = null
            res.json({
                error:null,
                message:"Delete OK"
            })

        })
    })


}