const mongoose= require("mongoose");
const mongoDbUrl= process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/RegisteredUsers";
mongoose.connect(mongoDbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
    // useCreateIndex:true
}).then(()=>{
    console.log("Connection to DB success")
}).catch((e)=>{
    console.log(`no connection error is ${e}`)
})