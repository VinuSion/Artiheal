import mongoose, { Schema, Document } from "mongoose";

interface HealthData extends Document {
  userId: Schema.Types.ObjectId;
  dateOfBirth: Date; // Fecha de Nacimiento
  height: number; // Altura en metros
  weight: number; // Peso en kilogramos
  bmi: number; // Indice Masa Corporal => peso (kg)/altura(m)^2
  dietaryPreference: string; // Preferencia de Dieta Ej: (Vegetariano, Vegano, Sin Gluten, Sin Lactosa, Paleo, Pescetariano, etc.)
  allergies: string[]; // Alergias a: (Maní, Frutos Secos, Leche, Huevo, Trigo, Soja, Mariscos, Pescado, Sésamo, etc.)
  medications: string[]; // Medicamentos (puede ser general o basado en alergias)
}

const HealthDataSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    dateOfBirth: { type: Date, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    bmi: { type: Number, required: true },
    dietaryPreference: { type: String },
    allergies: [String],
    medications: [String],
  },
  { collection: "healthData" }
);

const HealthDataModel = mongoose.model<HealthData>(
  "HealthData",
  HealthDataSchema
);
export default HealthDataModel;
