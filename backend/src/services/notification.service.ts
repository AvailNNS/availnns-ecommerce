import nodemailer from "nodemailer";


// ===============================
// EMAIL TRANSPORTER
// ===============================

const transporter =
nodemailer.createTransport({

  host: process.env.EMAIL_HOST,

  port: Number(
    process.env.EMAIL_PORT
  ),

  secure: false,

  auth: {

    user:
    process.env.EMAIL_USER,

    pass:
    process.env.EMAIL_PASS,

  },

});




// ===============================
// SEND EMAIL
// ===============================

export const sendEmail =
async(
  to:string,
  subject:string,
  html:string
)=>{


await transporter.sendMail({

  from:
  process.env.EMAIL_USER,

  to,

  subject,

  html,

});


};




// ===============================
// ORDER STATUS EMAIL
// ===============================

export const sendOrderStatusEmail =
async(
 user:any,
 order:any
)=>{


await sendEmail(

 user.email,


 `Order ${order._id} Status Updated`,


 `

 <h2>
 Hello ${user.name}
 </h2>


 <p>
 Your order status has been updated.
 </p>


 <h3>
 Status:
 ${order.status}
 </h3>


 <p>
 Thank you for shopping with AvailNNS.
 </p>


 `


);


};