import mongoose, { Schema, Document } from "mongoose";

// Interface que guarda las posibles rutinas que el usuario puede elegir
interface Routine extends Document {
  name: string; // Nombre de la rutina
  dietaryPreferences: string[]; // Preferencias de dieta que esta rutina soporta
  daysOfWeek: { // Dias de la semana
    day: string; // El dia (Lunes - Domingo)
    foods: { // Alimentos que se deben consumir ese dia
      foodId: Schema.Types.ObjectId; // Referencia a -> "foodModel.ts"
      quantity: number; // Cantidad de ese alimento que se debe digerir
    }[];
  }[];
}

const RoutineSchema = new Schema({
  name: { type: String, required: true },
  dietaryPreferences: [String],
  daysOfWeek: [
    {
      day: { type: String, required: true },
      foods: [
        {
          foodId: { type: Schema.Types.ObjectId, ref: "Food", required: true  },
          quantity: { type: Number, required: true },
        },
      ],
    },
  ],
});

const RoutineModel = mongoose.model<Routine>("Routine", RoutineSchema);

export default RoutineModel;
