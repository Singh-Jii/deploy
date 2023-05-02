const my_jwt=require("jsonwebtoken");



const my_redis=require("./help/red");



const my_auth=async(request, response, next)=>{



    try{



        const my_tok=request.headers?.authorization?.split(" ")[1];



        if(!my_tok){


            return response.status(401).send("try to logged in again");


        }


        const my_tok_valid=await my_jwt.verify(my_tok, process.env.JWT_SECRET);


        if(!my_tok_valid){


            return response.send("try to login again");


        }


        const my_tok_black_list=await my_redis.get(my_tok);


        if(my_tok_black_list){


            return response.send("not authorised to log in");


        }


        request.body.clients_id=my_tok_valid.clients_id;



        request.body.places=my_tok_valid.places;


        next();



    }


    catch(errors){


        response.send(errors.mesage);



    }



};




module.exports={my_auth};
