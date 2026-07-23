import axios from "axios";


export const sendWhatsappMessage = async(

phone:string,
message:string

)=>{

try{

await axios.post(

`https://graph.facebook.com/v23.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,

{

messaging_product:"whatsapp",

to:phone,

type:"text",

text:{
body:message
}

},

{

headers:{

Authorization:
`Bearer ${process.env.WHATSAPP_TOKEN}`,

"Content-Type":
"application/json"

}

}

);


}catch(error){

console.log(error);

}

};