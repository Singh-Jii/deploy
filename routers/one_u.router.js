const {my_routes}=require("express");


const {logged_in,signed_up,logged_out}=require("../controll/u.controll");


const {my_auth}=require("../middleware/authorisation");




const my_route_one=my_routes();


my_route_one.post("/logged_in",logged_in);


my_route_one.post("/signed_up",signed_up);



my_route_one.get("/logged_out",my_auth,logged_out);






module.exports={my_route_one};