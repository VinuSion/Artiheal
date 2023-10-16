import mongoose, { Schema, Document } from 'mongoose';

interface Food extends Document {
    foodId: string; // Identificacion personalizada del alimento
    name: string; // Nombre del Alimento (Arroz, Carne, Huevo, Pan, etc.)
    servingSize: number; // Porcion del alimento en gramos (5g, 20g, etc.)
    calories: number; // Calorias del alimento en kilocalorias (20kcal, 57kcal, etc.)
    foodType: string; // Tipo de alimento (Bebida o Comida)
}

const FoodSchema = new Schema({
    foodId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    servingSize: { type: Number, required: true },
    calories: { type: Number, required: true },
    foodType: { type: String, required: true },
})

const FoodModel = mongoose.model<Food>('Food', FoodSchema);
export default FoodModel;