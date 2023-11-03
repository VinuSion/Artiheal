import mongoose, { Schema, Document } from "mongoose";

// Interface que representa el diario de alimentos consumidos por el usuario
interface FoodEntry {
  date: Date; // Fecha del registro
  foods: { // Array de todos los alimentos
    foodID: Schema.Types.String; // Referencia a -> "foodModel.ts"
    name: string; // Nombre del alimento
    quantity: number; // Cantidad de dicho alimento consumido en gramos/mililitros
    mealType: string; // Tipo de Comida de este registro (Desayuno, Almuerzo, Cena, Merienda)
    caloriesConsumed: number; // Calorias consumidas de este alimento => (Cantidad / Porcion del alimento) * Calorias del alimento
    foodImage: string; // Imagen del alimento
  }[];
  totalCalories: number; // Sumatoria de calorias consumidas de todos los alimentos de este registro
}

// Schema del registro del diario de alimentos consumidos por el usuario
const FoodEntrySchema = new Schema({
  date: { type: Date, required: true },
  foods: [
    {
      foodID: { type: Schema.Types.String, ref: "Food", required: true },
      name: { type: String, required: true},
      quantity: { type: Number, required: true },
      mealType: { type: String, required: true },
      caloriesConsumed: { type: Number, required: true },
      foodImage: { type: String, required: true},
    },
  ],
  totalCalories: { type: Number, required: true },
});

// Interface que representa las tareas actuales del usuario
interface CurrentTask {
  taskId: Schema.Types.ObjectId; // Referencia a -> "taskModel.ts"
  status: boolean; // Estado de la tarea (true para completada, false para pendiente)
  progress: number; // Progreso en porcentaje (0-100)
  dueDate: Date; // Fecha de vencimiento de la tarea
  initialDate: Date; // Fecha en que se asigno la tarea
  completedDate: Date | null; // Fecha en que se completo la tarea (null si no se ha completado)
}

// Schema de las tareas actuales del usuario
const CurrentTaskSchema = new Schema({
  taskId: { type: Schema.Types.ObjectId, ref: "Task", required: true },
  status: { type: Boolean, default: false }, // Por defecto esta pendiente, osea false
  progress: { type: Number, default: 0 }, // Inicializa el progreso en 0
  dueDate: { type: Date, required: true },
  initialDate: { type: Date, required: true },
  completedDate: { type: Date, default: null },
});

// Interface que representa el historial de las tareas completados o no completados por el usuario
interface TaskHistory {
  taskId: Schema.Types.ObjectId;
  pointsRecieved: number; // Puntos que obtuvo por completar la tarea
  progress: number;
  dueDate: Date;
  initialDate: Date;
  completedDate: Date;
  completedOnTime: boolean; // True si lo completo a tiempo, False si no
}

// Schema de las tareas completadas por el usuario
const TaskHistorySchema = new Schema({
  taskId: { type: Schema.Types.ObjectId, ref: "Task" },
  pointsRecieved: { type: Number, required: true },
  progress: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  initialDate: { type: Date, required: true },
  completedDate: { type: Date, required: true },
  completedOnTime: { type: Boolean, required: true },
});

// Interface para un medicamento y su rutina en la semana
interface Medication {
  name: string; // Nombre del medicamento
  medicationType: string; // Tipo de medicamento (Pastilla, Suero, etc.)
  medicineRoutine: { // Array de los medicamentos en la rutina
    day: string; // Dia de la semana (Lunes - Domingo)
    hour: string; // Tiempo del dia (12:00 AM, 2:30 PM, etc.)
  }[];
}

// Schema para los medicamentos en la rutina
const MedicationSchema = new Schema({
  name: { type: String, required: true },
  medicationType: { type: String, required: true },
  medicineRoutine: [
    {
      day: { type: String, required: true },
      hour: { type: String, required: true },
    },
  ],
});

interface Profile extends Document {
  userId: Schema.Types.ObjectId; // Referencia a -> "userModel.ts"
  foodDiary: FoodEntry[]; // Todos los registros del diario de alimentos
  currentTasks: CurrentTask[]; // Todas las tareas actuales que tiene el usuario en el momento
  taskHistory: TaskHistory[]; // Array con el historial de todas las tareas
  selectedRoutine: Schema.Types.ObjectId | null; // Referencia a -> "routineModel.ts"
  medications: Medication[]; // Array de todos los medicamentos en la rutina
}

const ProfileSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  foodDiary: [FoodEntrySchema],
  currentTasks: [CurrentTaskSchema],
  taskHistory: [TaskHistorySchema],
  selectedRoutine: {
    type: Schema.Types.ObjectId,
    ref: "Routine",
    default: null,
  }, // Rutina que el usuario elegio cuando creo la cuenta (Puede que no la seleccione, entonces por defecto es null)
  medications: [MedicationSchema],
});

const ProfileModel = mongoose.model<Profile>("Profile", ProfileSchema);

export default ProfileModel;
