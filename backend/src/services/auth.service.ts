import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User";
import PhoneOtp from "../models/PhoneOtp";


// ===============================
// REGISTER USER
// ===============================

export const registerUser = async ({
  name,
  email,
  phone,
  password,
}: {
  name: string;
  email: string;
  phone: string;
  password: string;
}) => {


  // ===============================
  // NORMALIZE PHONE
  // ===============================

  if (phone.startsWith("01")) {

    phone =
      "+88" + phone;

  }



  // ===============================
  // REQUIRED
  // ===============================

  if (
    !name ||
    !email ||
    !phone ||
    !password
  ) {

    throw new Error(
      "All fields are required"
    );

  }



  // ===============================
  // EMAIL EXISTS
  // ===============================

  const existingEmail =
    await User.findOne({
      email,
    });


  if (existingEmail) {

    throw new Error(
      "Email already exists"
    );

  }



  // ===============================
  // PHONE EXISTS
  // ===============================

  const existingPhone =
    await User.findOne({
      phone,
    });


  if (existingPhone) {

    throw new Error(
      "Phone number already exists"
    );

  }



  // ===============================
  // CHECK VERIFIED OTP
  // ===============================

  const verifiedOtp =
    await PhoneOtp.findOne({

      phone,

      purpose:
        "register",

      verified:
        true,

    });



  if (!verifiedOtp) {

    throw new Error(
      "Please verify your phone number first."
    );

  }



  // ===============================
  // HASH PASSWORD
  // ===============================

  const hashedPassword =
    await bcrypt.hash(
      password,
      10
    );



  // ===============================
  // CREATE USER
  // ===============================

  const user =
    await User.create({

      name,

      email,

      phone,

      password:
        hashedPassword,

    });



  // ===============================
  // DELETE USED OTP
  // ===============================

  await PhoneOtp.deleteMany({

    phone,

    purpose:
      "register",

  });



  // ===============================
  // CREATE JWT
  // ===============================

  const token =
    jwt.sign(

      {
        id:user._id,

        role:user.role,

      },

      process.env.JWT_SECRET as string,

      {
        expiresIn:"7d",
      }

    );



  return {

    user,

    token,

  };


};




// ===============================
// LOGIN USER
// ===============================

export const loginUser = async ({
  email,
  password,
}:{
  email:string;
  password:string;
}) => {


  if(
    !email ||
    !password
  ){

    throw new Error(
      "Email and password are required"
    );

  }



  const user =
    await User.findOne({
      email,
    });



  if(!user){

    throw new Error(
      "Invalid email or password"
    );

  }



  const isMatch =
    await bcrypt.compare(

      password,

      user.password

    );



  if(!isMatch){

    throw new Error(
      "Invalid email or password"
    );

  }



  const token =
    jwt.sign(

      {
        id:user._id,

        role:user.role,

      },

      process.env.JWT_SECRET as string,

      {
        expiresIn:"7d",
      }

    );



  return {

    user,

    token,

  };


};