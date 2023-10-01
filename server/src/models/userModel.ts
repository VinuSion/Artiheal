import mongoose, { Schema, Document } from "mongoose";

// Interface que representa el diario de alimentos consumidos por el usuario
interface FoodEntry {
  date: Date; // Fecha del registro
  foods: { // Array de todos los alimentos
    foodId: Schema.Types.ObjectId; // Referencia a -> "foodModel.ts"
    quantity: number; // Cantidad de dicho alimento en gramos
    mealType: string; // Tipo de Comida de este registro (Desayuno, Almuerzo, Cena, Merienda)
    caloriesConsumed: number; // Calorias consumidas de este alimento => (Cantidad / Porcion del alimento) * Calorias del alimento
  }[];
  totalCalories: number; // Sumatoria de calorias consumidas de todos los alimentos de este registro
}

// Schema del registro del diario de alimentos consumidos por el usuario
const FoodEntrySchema = new Schema({
  date: { type: Date, required: true },
  foods: [
    {
      foodId: { type: Schema.Types.ObjectId, ref: "Food", required: true },
      quantity: { type: Number, required: true },
      mealType: { type: String, required: true },
      caloriesConsumed: { type: Number, required: true },
    },
  ],
  totalCalories: { type: Number, required: true },
});

interface User extends Document {
  name: string; // Nombre y Apellido
  email: string; // Correo electronico
  password: string; // Contraseña
  phoneNumber: string; // Numero de telefono
  foodDiary: FoodEntry[]; // Todos los registros del diario de alimentos
  resetToken: string; // Se utiliza para resetear/cambiar contraseña
}

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    foodDiary: [FoodEntrySchema],
    resetToken: { type: String },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<User>("User", UserSchema);
export default UserModel;
