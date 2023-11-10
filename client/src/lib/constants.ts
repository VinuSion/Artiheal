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

export interface PendingTask {
  description: string; 
  goal: number; 
  pointsAwarded: number;
  taskId: string;
  status: boolean;
  progress: number;
  dueDate: Date;
  initialDate: Date;
  completedDate: Date | null;
}

export interface PointsProfile {
  userId: string;
  earnedPoints: number;
  level: number;
  nextLevelPoints: number;
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

export const cardProInfo = [
  {
    productImage: "https://github.com/VinuSion/Artiheal/assets/146145167/3364b1d6-4d37-4e67-891a-424b37498c25",
    spanTitle: "Ensalada Mcdonalds",
    spanMessage:
      "20 puntos",
  },
  {
    productImage: "https://github.com/VinuSion/Artiheal/assets/146145167/81f0d2c7-8d12-433e-8004-26f4ab8ee73a",
    spanTitle: "Jugo de naranja Exito",
    spanMessage:
      "20 puntos",
  },
  {
    productImage: "https://github.com/VinuSion/Artiheal/assets/146145167/3f66483d-6408-423e-b45d-fbe4cb6f9509",
    spanTitle: "Ensalada KFC",
    spanMessage:
      "20 puntos",
  },
  {
    productImage: "https://github.com/VinuSion/Artiheal/assets/146145167/21341599-f809-49ab-a450-e00b30524d7f",
    spanTitle: "Funko Darth Vader",
    spanMessage:
      "45 puntos",
  },
  {
    productImage: "https://github.com/VinuSion/Artiheal/assets/146145167/b1cb9d14-3fa4-4cd2-860f-4cd25f5a8408",
    spanTitle: "Gift Card Microsoft",
    spanMessage:
      "55 puntos",
  },
  {
    productImage: "https://github.com/VinuSion/Artiheal/assets/146145167/8b9d0cda-f811-444d-bbba-51a8f80e89cc",
    spanTitle: "Audifonos Apple",
    spanMessage:
      "60 puntos",
  },
  {
    productImage: "https://github.com/VinuSion/Artiheal/assets/146145167/15214bf3-4ef9-46e4-a96a-c1a9665dcbf4",
    spanTitle: "Balón Adidas",
    spanMessage:
      "70 puntos",
  },
  {
    productImage: "https://github.com/VinuSion/Artiheal/assets/146145167/ee3107ae-18d0-4e69-80c0-27106fb8334f",
    spanTitle: "Zapatos Adidas",
    spanMessage:
      "95 puntos",
  },
  {
    productImage: "https://github.com/VinuSion/Artiheal/assets/146145167/6c9652a9-8721-4f35-88c2-4615194aa43c",
    spanTitle: "Camiseta Adidas",
    spanMessage:
      "105 puntos",
  },
];

export const levelBenefitsInfo = [
  {
    lvl: 4,
    title: "Nivel 4",
    description: "¡Completa tareas y obtén x2.5 veces mas de puntos! 😁",
    range: "+2000 puntos",
  },
  {
    lvl: 3,
    title: "Nivel 3",
    description: "¡Cada tarea que completes vale el doble de puntos!",
    range: "500 - 1999 puntos",
  },
  {
    lvl: 2,
    title: "Nivel 2",
    description: "Tus tareas valen un x1.6 veces más en puntos.",
    range: "100 - 499 puntos",
  },
  {
    lvl: 1,
    title: "Nivel 1",
    description: "Tus tareas valen un x1.2 veces más en puntos.",
    range: "25 - 99 puntos",
  },
  {
    lvl: 0,
    title: "Nivel 0",
    description: "Recibirás los puntos indicados por cada tarea completada.",
    range: "0 - 24 puntos",
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

export type Level = 0 | 1 | 2 | 3 | 4;

export interface LevelPoints {
  [level: number]: {
    min: number;
    max: number;
  };
}