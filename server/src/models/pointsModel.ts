import mongoose, { Schema, Document } from "mongoose";

interface Points extends Document {
  userId: Schema.Types.ObjectId; // Referencia a -> "userModel.ts"
  earnedPoints: number; // Total de puntos obtuvidos por el usuario
  level: number; // Nivel actual de beneficio del usuario
  nextLevelPoints: number; // Puntos que faltan para llegar al proximo nivel
}

const PointsSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  earnedPoints: { type: Number, default: 0 }, // Inicializa con 0 puntos cuando el usuario crea una cuenta
  level: { type: Number, default: 0 },
  nextLevelPoints: { type: Number, default: 25 }, // Calculado basado en el nivel actual, por defecto es 25 al crear una cuenta
});

const PointsModel = mongoose.model<Points>("Point", PointsSchema);
export default PointsModel;

/*
    LEVELS
    Level 0: Earn from 0 - 24 points
    Level 1: Earn from 25 - 99 points
    Level 2: Earn from 100 - 499 points
    Level 3: Earn from 500 - 1999 points
    Level 4: Earn 2000+ points and above

    Example: Completed a task worth 7 points -> User is Level 2 of benefits -> therefore they get 10 points (rounded down from 10.7)

    BENEFITS
    Level 0: Points multiplication factor x1 | Divide the result by 1
    Level 1: Points multiplication factor x1.2 | Divide the result by 4
    Level 2: Points multiplication factor x1.6 | Divide the result by 3
    Level 3: Points multiplication factor x2 | Divide the result by 2
    Level 4: Points multiplication factor x2.5 | Divide the result by 1

    Example: User is on Level 1 and has earned a total of 98 points ever since they created an account on the app -> complete one more task that earns them 5 points -> now theyre at 103 points -> succesfully leveled up to Level 2.
*/