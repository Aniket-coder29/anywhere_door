// const { urlencoded } = require("express");
const { RSA_NO_PADDING } = require("constants");
const express= require("express");
const path= require("path")
// const ejs=require("ejs")
const app=express();
require("./db/dbms")
const Register= require("./models/register")
const port= process.env.PORT || 3000;
const https = require('https');
const session= require("express-session")
// var alert = require('alert');
const static_path=path.join(__dirname,"../public/anywhereDoor/views")

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(static_path))
app.use(session({secret:"akfdhf984y5ybhqfdur834r7ycr9839nx0",resave:false,saveUninitialized:true}))
app.set('view engine','ejs')
app.set("views",static_path)

app.get('/',(req,res)=>{
    // if(!req.session.loginuser)
    res.render("index")
    // else
    // res.render("index_l")
})
// app.get('/signup',(req,res)=>{
//     res.render("signup")
// })
app.get("/register",(req,res)=>{
    res.render("signup")
})
app.get("/login",(req,res)=>{
    res.render("login")
})


//create a new user in our database
app.post("/register",async(req,res)=>{
    try {
        // console.log(req.body.name);
        const user=new Register({
            name:req.body.name,
            email:req.body.email,
            username:req.body.username,
            password:req.body.password
        });
        const registered=await user.save();
        res.redirect("/login")
        // res.status(201).render("login")
    } catch (error) {
        res.status(400).send(error);
    }
})
app.post("/login",async(req,res)=>{
    try{
        const username=req.body.username;
        const password=req.body.password;
        const loginuser= await Register.findOne({username:username});
        if(loginuser.password === password){
            req.session.loginuser=loginuser
            res.status(201).render("animation")
        }
        else{
            res.send("Wrong password")
        }
        // res.send(loginuser);
        // console.log(loginuser);
    }
    catch(e){
        // alert("Oops! Something went wrong.");
        res.status(400).send("Invalid Credentials")
    }
})
app.get("/animation",(req,res)=>{
    if(!req.session.loginuser){
        res.status(201).render("login")
        // res.status(400).send("Please Login")
    }
    else{
    res.status(201).render("animation")
    }

})
app.post("/feedback",(req,res)=>{
    res.status(201).render("index")
})

app.listen(port,()=>{
    console.log(`Listening to port ${port}`)
})