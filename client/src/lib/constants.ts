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
  foodId: string;
  name: string;
  servingSize: number;
  calories: number;
  foodType: string;
  picture: string;
  quantity: number;
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

export interface TaskHistoryEntry {
  taskId: string;
  description: string;
  pointsReceived: number;
  progress: number;
  goal: number;
  completedDate: Date;
  completedOnTime: boolean;
}

export interface MealTypeCounts {
  NA: number;
  breakfast: number;
  lunch: number;
  dinner: number;
  snack: number;
}

export interface FoodTypeCount {
  name: string;
  count: number;
}

export const cardOpInfo = [
  {
    opinionImage: "https://github.com/VinuSion/Artiheal/assets/56313573/c611d782-b3a9-414f-a1c8-297afa71aa61",
    spanName: "Verónica Gil",
    spanOpinion:
      '"Artiheal es genial. Ha marcado la diferencia en mi salud. ¡Una herramienta increíble!"',
  },
  {
    opinionImage: "https://github.com/VinuSion/Artiheal/assets/56313573/38304187-c500-4555-83e0-f0300c7e42cd",
    spanName: "Andrés Martínez",
    spanOpinion:
      '"No puedo dejar de usar Artiheal. ¡Me encanta ganar puntos redimibles mientras me cuido!"',
  },
  {
    opinionImage: "https://github.com/VinuSion/Artiheal/assets/56313573/162c49d8-dc80-4ce0-bfa3-44122a03bdd2",
    spanName: "Salvio Peña",
    spanOpinion:
      '"Me encanta Artiheal. Hace que la vida saludable sea más fácil. Cinco estrellas merecidas."',
  },
];

export const cardProductInfo = [
  {
    productImage:
      "https://github.com/VinuSion/Artiheal/assets/146145167/3364b1d6-4d37-4e67-891a-424b37498c25",
    title: "Ensalada Cesar",
    vendor: "McDonalds",
    pointsValue: "250 puntos",
  },
  {
    productImage:
      "https://github.com/VinuSion/Artiheal/assets/146145167/81f0d2c7-8d12-433e-8004-26f4ab8ee73a",
    title: "Jugo de Naranja",
    vendor: "Exito",
    pointsValue: "200 puntos",
  },
  {
    productImage:
      "https://github.com/VinuSion/Artiheal/assets/146145167/21341599-f809-49ab-a450-e00b30524d7f",
    title: "Funko Darth Vader",
    vendor: "Funko",
    pointsValue: "500 puntos",
  },
  {
    productImage:
      "https://github.com/VinuSion/Artiheal/assets/146145167/b1cb9d14-3fa4-4cd2-860f-4cd25f5a8408",
    title: "Tarjeta de Regalo",
    vendor: "Microsoft",
    pointsValue: "550 puntos",
  },
  {
    productImage:
      "https://github.com/VinuSion/Artiheal/assets/56313573/61ed0754-51bd-4cf2-8772-4a5665dd4052",
    title: "Airpods Pro",
    vendor: "Apple",
    pointsValue: "1.5k puntos",
  },
  {
    productImage:
      "https://github.com/VinuSion/Artiheal/assets/56313573/0b69defe-1523-4d92-970b-935e75d7ce98",
    title: "Samsung Galaxy A04",
    vendor: "Exito",
    pointsValue: "2.5K Puntos",
  },
  {
    productImage:
      "https://github.com/VinuSion/Artiheal/assets/56313573/9d12e020-2331-4d88-a614-7818b72b555f",
    title: "Balón 2014 WC",
    vendor: "Adidas",
    pointsValue: "1k puntos",
  },
  {
    productImage:
      "https://github.com/VinuSion/Artiheal/assets/56313573/7adc82ed-6dd4-4a17-9478-d01c687381bb",
    title: "Zapatos A1-Stripe",
    vendor: "Adidas",
    pointsValue: "950 puntos",
  },
  {
    productImage:
      "https://github.com/VinuSion/Artiheal/assets/56313573/2a4b88d3-5876-4597-b5cf-97ac77b0d99d",
    title: "Camiseta Gris XL",
    vendor: "Adidas",
    pointsValue: "670 puntos",
  },
];

export const levelBenefitsInfo = [
  {
    lvl: 4,
    title: "Nivel 4",
    description: "¡Completa tareas y obtén más del doble de puntos! 🤩",
    range: "+2000 puntos",
  },
  {
    lvl: 3,
    title: "Nivel 3",
    description: "¡Recibiras el doble de puntos al completar tareas! 😁",
    range: "500 - 1999 puntos",
  },
  {
    lvl: 2,
    title: "Nivel 2",
    description: "Los puntos conseguidos por tareas se multiplican por 1.6",
    range: "100 - 499 puntos",
  },
  {
    lvl: 1,
    title: "Nivel 1",
    description: "Los puntos conseguidos por tareas se multiplican por 1.2",
    range: "25 - 99 puntos",
  },
  {
    lvl: 0,
    title: "Nivel 0",
    description: "Recibirás los puntos indicados por cada tarea completada",
    range: "0 - 24 puntos",
  },
];

export const logos = [
  "https://github.com/VinuSion/Artiheal/assets/56313573/bf4658ee-7362-4c1a-8bde-ba8e495315cf",
  "https://github.com/VinuSion/Artiheal/assets/56313573/3286fec2-65ed-4265-a299-3f99228e1306",
  "https://github.com/VinuSion/Artiheal/assets/56313573/e01009e6-3708-475c-89e3-34d5e372c3ce",
  "https://github.com/VinuSion/Artiheal/assets/56313573/612c85d7-c864-4aaf-894a-68e1f11d8e01",
  "https://github.com/VinuSion/Artiheal/assets/56313573/fad59ed7-25f8-4d48-b989-f262ddcac871",
  "https://github.com/VinuSion/Artiheal/assets/56313573/d52a3f8b-7837-47fc-8cb9-257f58f0f057",
  "https://github.com/VinuSion/Artiheal/assets/56313573/85384a14-c6b5-43c3-832c-38fb8987862c",
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

export const downloadIcon = '<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM2ZTgxOTIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1kb3dubG9hZCI+PHBhdGggZD0iTTIxIDE1djRhMiAyIDAgMCAxLTIgMkg1YTIgMiAwIDAgMS0yLTJ2LTQiLz48cG9seWxpbmUgcG9pbnRzPSI3IDEwIDEyIDE1IDE3IDEwIi8+PGxpbmUgeDE9IjEyIiB4Mj0iMTIiIHkxPSIxNSIgeTI9IjMiLz48L3N2Zz4=" class="chart-icon" width="19">';

export const zoominIcon = '<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM2ZTgxOTIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS16b29tLWluIj48Y2lyY2xlIGN4PSIxMSIgY3k9IjExIiByPSI4Ii8+PGxpbmUgeDE9IjIxIiB4Mj0iMTYuNjUiIHkxPSIyMSIgeTI9IjE2LjY1Ii8+PGxpbmUgeDE9IjExIiB4Mj0iMTEiIHkxPSI4IiB5Mj0iMTQiLz48bGluZSB4MT0iOCIgeDI9IjE0IiB5MT0iMTEiIHkyPSIxMSIvPjwvc3ZnPg==" class="chart-icon" width="20">';

export const zoomoutIcon = '<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM2ZTgxOTIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS16b29tLW91dCI+PGNpcmNsZSBjeD0iMTEiIGN5PSIxMSIgcj0iOCIvPjxsaW5lIHgxPSIyMSIgeDI9IjE2LjY1IiB5MT0iMjEiIHkyPSIxNi42NSIvPjxsaW5lIHgxPSI4IiB4Mj0iMTQiIHkxPSIxMSIgeTI9IjExIi8+PC9zdmc+" class="chart-icon" width="20">';

export const resetIcon = '<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM2ZTgxOTIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1yb3RhdGUtY2N3Ij48cGF0aCBkPSJNMyAxMmE5IDkgMCAxIDAgOS05IDkuNzUgOS43NSAwIDAgMC02Ljc0IDIuNzRMMyA4Ii8+PHBhdGggZD0iTTMgM3Y1aDUiLz48L3N2Zz4=" class="chart-icon" width="19">';
