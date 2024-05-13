const mongoose=require ("mongoose");


//define the Mongodb connection url
const mongoURL='mongodb://localhost:27017/hotels' //replace mydatabase with your database name.

//set up mongodb connections
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

//get the default connection
//mongoose maintain a default connection object representing the mongodb connection.
const db=mongoose.connection;

db.on('connected',()=>{
    console.log("connected to mongodb server")
})
db.on('error',(err)=>{
    console.log("mongodb connection error",err)
})
db.on('disconnected',()=>{
    console.log("mongodb disconnected")
})

module.exports=db;

