import mongoose, { Schema, Document } from "mongoose";

interface User extends Document {
  firstName: string; // Nombre
  lastName: string; // Apellido
  email: string; // Correo electronico
  password: string; // Contraseña
  resetToken: string; // Se utiliza para resetear/cambiar contraseña
}

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetToken: { type: String },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<User>("User", UserSchema);
export default UserModel;
