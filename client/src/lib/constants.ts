// Defines the interface for user data
export interface UserInfo {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  pictureURL: string;
}

// Defines the interface for health data
export interface HealthData {
  userId: string;
  dateOfBirth: Date;
  height: number;
  weight: number;
  bmi: number;
  dietaryPreference: string;
  allergies: string[];
  medications: string[];
}

export interface FoodEntry {
  date: Date;
  foods: FoodEntries[];
  totalCalories: number;
  threePointsBenefit: boolean;
}

export interface CurrentTask {
  taskId: string;
  status: boolean;
  progress: number;
  dueDate: Date;
  initialDate: Date;
  completedDate: Date | null;
}

export interface TaskHistory {
  taskId: string;
  pointsReceived: number;
  progress: number;
  dueDate: Date;
  initialDate: Date;
  completedDate: Date;
  completedOnTime: boolean;
}

interface Medication {
  name: string;
  medicationType: string;
  medicineRoutine: {
    day: string;
    hour: string;
  }[];
}

// Defines the interface for profile
export interface Profile {
  userId: string;
  foodDiary: FoodEntry[];
  currentTasks: CurrentTask[];
  taskHistory: TaskHistory[];
  selectedRoutine: string;
  medications: Medication[];
}

// Defines the interface for a routine
export interface Routine {
  name: string;
  dietaryPreference: string;
  daysOfWeek: {
    day: string;
    foods: FoodItem[];
  }[];
}

// Defines the interface for food items in the routine
export interface FoodItem {
  foodItemId: string;
  name: string;
  quantity: number;
}

export interface Food {
  foodId: string,
  name: string,
  servingSize: number,
  calories: number,
  foodType: string,
  picture: string,
  quantity: number,
}

export interface FoodEntries {
  foodID: string;
  name: string;
  quantity: number;
  mealType: string;
  caloriesConsumed: number;
  foodImage: string;
}

export interface Task {
  foodReference: string;
  description: string; 
  goal: number; 
  pointsAwarded: number;
  taskType: string; 
}

export const cardOpInfo = [
  {
    opinionImage: "src/assets/opinions/user1.webp",
    spanName: "Verónica Gil",
    spanOpinion:
      '"Artiheal es genial. Ha marcado la diferencia en mi salud. ¡Una herramienta increíble!"',
  },
  {
    opinionImage: "src/assets/opinions/user2.webp",
    spanName: "Andrés Martínez",
    spanOpinion:
      '"No puedo dejar de usar Artiheal. ¡Me encanta ganar puntos redimibles mientras me cuido!"',
  },
  {
    opinionImage: "src/assets/opinions/user3.webp",
    spanName: "Salvio Peña",
    spanOpinion:
      '"Me encanta Artiheal. Hace que la vida saludable sea más fácil. Cinco estrellas merecidas."',
  },
];

export const logos = [
  "adidas.svg",
  "exito.svg",
  "funko.svg",
  "mcdonalds.svg",
  "microsoft.svg",
  "kfc.svg",
  "apple.svg",
];

export const settingsData = [
  {
    id: "notifications",
    title: "Notificaciones push",
    description: "Recibe actualizaciones y alertas en tiempo real.",
    isActivated: true,
  },
  {
    id: "security-privacy",
    title: "Seguridad y privacidad",
    description: "Restringir quien tiene acceso a tu informacion.",
    isActivated: true,
  },
  {
    id: "email-notifications",
    title: "Notificaciones por correo electrónico",
    description: "Recibir notificaciones de nuevas novedades de la plataforma.",
    isActivated: false,
  },
  {
    id: "share-data-with-us",
    title: "Compartir datos de uso",
    description: "Compartir datos de uso anónimos para mejorar la aplicación.",
    isActivated: true,
  },
  {
    id: "auto-logout",
    title: "Cerrar sesión automáticamente",
    description:
      "Cerrar automáticamente la sesión después de un período de inactividad.",
    isActivated: false,
  },
];

export const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export const bmiCategories = [
  { category: "Bajo peso", range: "Menor a 18.5" },
  { category: "Peso saludable", range: "18.5 - 24.9" },
  { category: "Sobrepeso", range: "25.0 - 29.9" },
  { category: "Obesidad clase 1", range: "30.0 - 34.9" },
  { category: "Obesidad clase 2", range: "35.0 - 39.9" },
  { category: "Obesidad clase 3", range: "40 o más" },
];

export const mealTypeMap: { [key: string]: string } = {
  NA: "N/A",
  breakfast: "Desayuno",
  lunch: "Almuerzo",
  dinner: "Cena",
  snack: "Merienda",
};