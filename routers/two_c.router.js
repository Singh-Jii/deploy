const {my_routes}=require("express");


const {my_auth}=require("../middleware/authorisation");


const {get_c_info,famous_place}=require("../controll/c.controll");


const my_red_lim=require("../middleware/r_lim");


const my_route_two=my_routes();


my_route_two.get("/famous_place",famous_place);


my_route_two.get("/:place",my_auth,get_c_info);



module.exports=my_route_two;