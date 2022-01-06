const mongoose= require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/RegisteredUsers",{
    useNewUrlParser:true,
    useUnifiedTopology:true
    // useCreateIndex:true
}).then(()=>{
    console.log("Connection to DB success")
}).catch((e)=>{
    console.log(`no connection error is ${e}`)
})