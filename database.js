const my_mongo=require("mongoose");



require("dotenv").config();




const my_connections=()=>my_mongo.connect(process.env.mymongourl);




module.exports=my_connections;