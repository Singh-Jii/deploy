const my_redis=require("../help/red");




const my_red_lim=async(request,response,next)=>{





    const ul=await my_redis.exists(request.ip);




    if(ul===1){




        let nr=await my_redis.get(request.ip);



        nr=+nr;




        if(nr<3){



            my_redis.incr(request.ip);


            next();



        } 



        
        else if(nr===3){



            my_redis.expire(request.ip,50);




            return response.send("max req.,apply after 1min");



        } 




        else{



            return response.send("max req.,apply after 1min");



        }




    } 



    else{



        my_redis.set(request.ip,1);



        next();




    }



};




module.exports=my_red_lim;