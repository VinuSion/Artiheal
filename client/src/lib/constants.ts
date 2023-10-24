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

interface FoodEntry {
  date: Date; 
  foods: {
    food: string;
    quantity: number;
    mealType: string;
    caloriesConsumed: number;
  }[];
  totalCalories: number;
}

interface CurrentTask {
  taskId: string; 
  status: boolean;
  progress: number;
  dueDate: Date;
  initialDate: Date;
  completedDate: Date | null;
}

interface TaskHistory {
  taskId: string;
  pointsRecieved: number;
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
  foodDiary: FoodEntry[]; // Todos los registros del diario de alimentos
  currentTasks: CurrentTask[]; // Todas las tareas actuales que tiene el usuario en el momento
  taskHistory: TaskHistory[]; // Array con el historial de todas las tareas
  selectedRoutine: string;
  medications: Medication[]; // Array de todos los medicamentos en la rutina
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
