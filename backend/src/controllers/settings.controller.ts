import {Request,Response} from "express";
import Setting from "../models/Setting";



// GET SETTINGS

export const getSettings =
async(
req:Request,
res:Response
)=>{


let settings =
await Setting.findOne();


if(!settings){

settings =
await Setting.create({});

}


res.json(settings);


};





// UPDATE SETTINGS ADMIN

export const updateSettings =
async(
req:Request,
res:Response
)=>{


const settings =
await Setting.findOneAndUpdate(

{},

req.body,

{
new:true,
upsert:true
}

);



res.json({

success:true,

settings

});


};