import mongoose, { Schema, Document } from "mongoose";

interface User extends Document {
  name: string; // Nombre y Apellido
  email: string; // Correo electronico
  password: string; // Contraseña
  phoneNumber: string; // Numero de telefono
  resetToken: string; // Se utiliza para resetear/cambiar contraseña
}

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    resetToken: { type: String },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<User>("User", UserSchema);
export default UserModel;
