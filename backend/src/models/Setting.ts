import mongoose from "mongoose";


const settingSchema =
new mongoose.Schema({

currency:{
type:String,
default:"USD"
},


symbol:{
type:String,
default:"$"
},


currencyPosition:{
type:String,
default:"before"
}


},{
timestamps:true
});


export default mongoose.model(
"Setting",
settingSchema
);