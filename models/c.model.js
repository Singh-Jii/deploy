const my_mongo=require("mongoose");


const client_place=my_mongo.Schema({



    clients_id:{

        type: my_mongo.Schema.Types.ObjectId, 


        refference: "client",

        req: true


    },


    old_searched_places:[{


        type: String,


        req: true



    }]



})



const clients_data_sheet=my_mongo.model("clients",client_place);




module.exports=clients_data_sheet;