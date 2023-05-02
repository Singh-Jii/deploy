const my_rr=require("redis");




const my_io=require("ioredis");





const my_redis=my_rr.createClient();




my_redis.on("connections",async()=>{



    console.log("redis connected");




});






my_redis.on("errors",(errors)=>{



    console.log(errors.mesage);




});




my_redis.connect();





module.exports=my_redis;