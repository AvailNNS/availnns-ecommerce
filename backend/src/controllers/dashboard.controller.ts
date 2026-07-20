import { Response } from "express";

import Order from "../models/Order";
import User from "../models/User";

import { AuthRequest } from "../middleware/auth.middleware";



// ===============================
// USER DASHBOARD
// ===============================

export const getUserDashboard = async(
req:AuthRequest,
res:Response
):Promise<void>=>{


try{


const userId =
req.user?.id;



const user =
await User.findById(userId)
.select("-password");



if(!user){

res.status(404).json({

success:false,

message:"User not found"

});

return;

}





const orders =
await Order.find({

user:userId

})
.sort({
createdAt:-1
})
.limit(5);






const allOrders =
await Order.find({

user:userId

});





const totalOrders =
allOrders.length;





const pendingOrders =
allOrders.filter(
(order)=>
order.orderStatus==="pending"
).length;





const deliveredOrders =
allOrders.filter(
(order)=>
order.orderStatus==="delivered"
).length;





const totalSpent =
allOrders.reduce(

(sum,order)=>

sum + order.totalPrice,

0

);







res.status(200).json({

success:true,


dashboard:{


user,


stats:{


totalOrders,

pendingOrders,

deliveredOrders,

totalSpent


},



recentOrders:orders



}


});



}catch(error:any){



res.status(500).json({

success:false,

message:"Dashboard loading failed",

error:error.message

});

}



};