export interface IUser {
  name: string;
  email: string;
  password: string;
  role?: "user" | "admin";
  resetPasswordToken?: string | null;
resetPasswordExpire?: Date | null;
}