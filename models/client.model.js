const my_mongo=require("mongoose");



 
const my_clients_schema=require.Schema({



    Names: {

        type: String,


        req: true


    },


    my_mail: {


        type: String,


        req: true,


        my_uniq: true

    },


    my_privacy:{

        type: String,


        req: true


    },


    places: {


        type: String,


        req: true


    }


})


const client=my_mongo.model("client",my_clients_schema);



module.exports=client;