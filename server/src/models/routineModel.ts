import mongoose, { Schema, Document } from "mongoose";

// Interface que guarda las posibles rutinas que el usuario puede elegir
interface Routine extends Document {
  name: string; // Nombre de la rutina
  dietaryPreference: string; // Preferencia de dieta que esta rutina soporta
  daysOfWeek: { // Dias de la semana
    day: string; // El dia (Lunes - Domingo)
    foods: { // Alimentos que se deben consumir ese dia
      foodItemId: Schema.Types.String; // Referencia a -> "foodModel.ts"
      name: string, // Nombre del alimento
      quantity: number; // Cantidad de ese alimento que se debe digerir
    }[];
  }[];
}

const RoutineSchema = new Schema({
  name: { type: String, required: true },
  dietaryPreference: { type: String },
  daysOfWeek: [
    {
      day: { type: String, required: true },
      foods: [
        {
          foodItemId: { type: Schema.Types.String, ref: "Food", required: true  },
          name: { type: String, required: true },
          quantity: { type: Number, required: true },
        },
      ],
    },
  ],
});

const RoutineModel = mongoose.model<Routine>("Routine", RoutineSchema);

export default RoutineModel;
