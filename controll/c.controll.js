const my_redis=require("../help/red");



const my_ax=require("axios");



const clients_data_sheet=require("../models/c.model");



const client=require("../models/client.model");



const my_api=process.env.ow_my_api;




const get_c_info=async(request,response)=>{





    try{





        const place=request.params.place||request.body.places;




        const places_ava=await my_redis.get(`${place}`);




        console.log(places_ava);




        if(places_ava){



             return response.status(200).send({list:places_ava});



        }





        const my_response=await my_ax.get(`https://ipapi.co/api/#introduction/v1/current.json?key=${my_api}&q=${place}`);





        const datas_w=my_response.list;





        console.log(datas_w);




        my_redis.set(place,JSON.stringify(datas_w),{ex:30*60});





        await clients_data_sheet.findOneAndUpdate({clients_id:request.body.clients_id },
            
            
        {


            clients_id: request.body.clients_id,

             $push: { 


                old_searched_places: place 


            }


        }, 


        { 


            new: true, 

            upsert: true, 


            setDefaultsOnInsert: true
            

        })





        return response.send({list:datas_w});



    } 



    catch(errors){



        return response.status(500).send(errors.mesage);




    }





}





const famous_place=async(request,response)=>{



    
    try{




        const cities=await clients_data_sheet.aggregate([



            
            {



                 $match: { 



                    clients_id: request.body.clients_id


                } 



            },
            


            {


                $unwind: "$old_searched_places"



            },


            
            {


                $group: {


                    _id:"$old_searched_places",


                    count: { 


                        $sum: 1 


                    }



                }


            },



            {


                $sort: { 



                    count: -1 



                }


            }



            ]);






        const place=cities[0]["_id"];




        const places_ava=await my_redis.get(`${place}`);





        if(places_ava){



             return response.status(200).send({list:places_ava});




        }




        const my_response=await my_ax.get(`https://ipapi.co/api/#introduction/v1/current.json?key=${my_api}&q=${place}`);





        const datas_w=my_response.list;




        

        my_redis.set(place,JSON.stringify(datas_w),{ex:30*60});





        await clients_data_sheet.findOneAndUpdate({clients_id:request.body.clients_id},
            
            

        {


            clients_id: request.body.clients_id, 


            $push: { 



            old_searched_places: place 



            }




        }, 



        { 



            new: true, 


            upsert: true, 


            setDefaultsOnInsert: true 



        })





        return response.send({list:datas_w});




    } 




    catch(errors){



        return response.status(500).send(errors.messsage);




    }




}






module.exports={get_c_info,famous_place};



