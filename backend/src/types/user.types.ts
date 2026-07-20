export interface IUser {

  _id?: string;


  name: string;


  email: string;


  password: string;


  role?: "user" | "admin";



  // =====================
  // PROFILE INFORMATION
  // =====================


  avatar?: string;


  phone?: string;


  address?: string;



  // =====================
  // PASSWORD RESET
  // =====================


  resetPasswordToken?: string | null;


  resetPasswordExpire?: Date | null;



  // =====================
  // TIMESTAMPS
  // =====================


  createdAt?: Date;


  updatedAt?: Date;

}