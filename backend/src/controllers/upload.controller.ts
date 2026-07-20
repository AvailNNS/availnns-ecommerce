import { Response } from "express";

import cloudinary from "../config/cloudinary";

import {
  AuthRequest
} from "../middleware/auth.middleware";



export const uploadAvatar = async(
  req: AuthRequest,
  res: Response
): Promise<void> => {


try{


if(!req.file){


res.status(400).json({

success:false,

message:"No image uploaded"

});


return;

}




const result =
await cloudinary.uploader.upload(

`data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,

{

folder:"noptrix/users"

}

);





res.status(200).json({

success:true,

message:"Avatar uploaded successfully",

url:result.secure_url

});




}catch(error:any){


res.status(500).json({

success:false,

message:"Image upload failed",

error:error.message

});


}


};