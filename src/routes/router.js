const express = require('express');
const route = express.Router();
const controller = require('../controller/controller');
const axios = require('axios');
var userDB = require("../models/add_user");




route.get("/",(req,res)=>{
    axios.get('http://localhost:3000/api/user')
    .then(function(response){
        console.log(response.data);
        res.render("index",{
            user : response.data
        });
    })
    .catch(err=>{
        res.send(err); 
    })
})
route.get("/add_user",(req,res)=>{
    res.render("add_user"); 
})
route.get("/update_user",(req,res)=>{
    axios.get('http://localhost:3000/api/user',{params :{id:req.query.id}})
    .then(function(userdata){
        // console.log(userdata.data);
        res.render("update_user",{
            user_update:userdata.data
        })
    })
    .catch(err =>{
        res.send(err)
    })
      
})


route.post('/update_data/:id', async function(req, res) {
    // axios.get('http://localhost:3000/api/user',{params :{id:req.params.id}})
    
    // Retrieve the tag from our URL path
    var id = req.params.id;
        await userDB.updateOne(req.body);
        res.redirect("/");
    console.log(req.body);
    // let articles = await Article.findAll({tag: id}).exec();

    res.send(id);
});


route.get('/delete_user',async(req,res)=>{
    console.log(req.query.id);
    await userDB.deleteOne({_id:req.query.id});
    // res.send(req.query.id)
    res.redirect("/");
});






// API

route.post('/api/user',controller.create);
route.get('/api/user',controller.find);
route.put('/api/update_user/:id',controller.update);
route.delete('/api/user/:id',controller.delete);

module.exports = route;