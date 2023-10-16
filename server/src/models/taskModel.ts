import mongoose, { Schema, Document } from "mongoose";

interface Task extends Document {
  foodReference: Schema.Types.String; // Referencia al ID del alimento relacionado
  description: string; // Descripcion de la tarea
  pointsAwarded: number; // Puntos ganados por completar la tarea
  taskType: string; // Tipo de tarea (e.g., "consumo alimentario", "medicamento", etc.)
}

const TaskSchema = new Schema({
  foodReference: { type: Schema.Types.String, ref: "Food", required: true }, // Referencia a -> "foodModel.ts"
  description: { type: String, required: true },
  pointsAwarded: { type: Number, required: true },
  taskType: { type: String, required: true },
});

const TaskModel = mongoose.model<Task>("Task", TaskSchema);

export default TaskModel;
