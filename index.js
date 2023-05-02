const myexpress = require("express");


const my_connections=require("./database");


const {my_route_one}=require("./routers/one_u.router");


const my_route_two=require("./routers/two_c.router");


const my_redis=require("./help/red");


const my_log=require("./middleware/logging");


require("dotenv").config();



const myport=process.env.myport || 8000;


const my_application=myexpress();


my_application.use(myexpress.json());



my_application.get("/",async(request,response)=>{



    response.send(await my_redis.get("Names"));


})


my_application.use("/api/clients",my_route_one);


my_application.use("/api/weathers",my_route_two);


my_application.listen(myport,async()=>{


    try{


        await my_connections();

        console.log("database connected");


        my_log.log("information","connected to database");



    }


    catch(errors){


        console.log(errors.mesage);

        my_log.log("errors","not connected to database");


    }


    console.log("database running on",myport);



});