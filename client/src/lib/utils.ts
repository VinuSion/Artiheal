import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { AxiosError } from "axios";
import { isToday, isValid, parse, format } from "date-fns";
import { FoodItem, mealTypeMap, Level, LevelPoints, FoodEntry, TaskHistory, MealTypeCounts } from "@/lib/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const normalizeName = (name: string) => {
  const nameParts = name.split(/\s+/);
  const filteredNameParts = nameParts.filter((part) => part.trim() !== '');

  const formattedNameParts = filteredNameParts.map((part) =>
    part.toLowerCase() === 'la' ? part : part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
  );

  const normalizedName = formattedNameParts.join(' ');
  return normalizedName;
};

export const getError = (error: AxiosError) => {
  if (error.response && error.response.data) {
    const responseData = error.response.data;
    if (typeof responseData === "object" && "message" in responseData) {
      return responseData.message;
    }
  }
  return error.message;
};

export const Range = (
  start: number,
  end: number,
  step: number = 1
): number[] => {
  const range = [];
  for (let i = start; i <= end; i += step) {
    range.push(i);
  }
  return range;
};

export const formatWeekday = (nameOfDay: string) => {
  return (nameOfDay.charAt(0).toUpperCase() + nameOfDay.slice(1)).slice(0, 2); // Capitalize the first letter, only return first 2 letters
};

export const isDateValid = (dateString: Date | null): string | null => {
  if (!dateString) {
    return "Este campo es requerido.";
  }

  const formattedDate = format(dateString, "MM/dd/yyyy");
  const parsedDate = parse(formattedDate, "MM/dd/yyyy", new Date());

  if (!isValid(parsedDate)) {
    return "Fecha inválida.";
  }

  if (isToday(parsedDate)) {
    return "No naciste hoy.";
  }

  return null;
};

export const ageRangeMessage = (age: number): string => {
  if (age < 10) {
    return "Eres muy joven. ¡Disfruta tu niñez y mantén una dieta equilibrada!";
  } else if (age < 20) {
    return "Eres un adolescente. ¡Explora el mundo y mantén hábitos saludables!";
  } else if (age < 30) {
    return "Estás en tus veinte. ¡El futuro es tuyo! Mantén una rutina de ejercicios y alimentación balanceada.";
  } else if (age < 40) {
    return "Tienes treinta años. ¡La vida comienza! Haz ejercicio regularmente y come alimentos nutritivos.";
  } else if (age < 50) {
    return "Estás en tus cuarenta. ¡La experiencia es sabiduría! No olvides las revisiones médicas.";
  } else if (age < 60) {
    return "Tienes cincuenta años. ¡La vida es hermosa! Practica la meditación y mantén un estilo de vida activo.";
  } else if (age < 70) {
    return "Estás en tus sesenta. ¡Disfruta de la jubilación! Controla tu presión arterial y come muchas frutas y verduras.";
  } else if (age < 80) {
    return "Tienes setenta años. ¡Sabiduría y experiencia! No dejes de cuidar tu salud física y mental.";
  } else if (age < 90) {
    return "Estás en tus ochenta. ¡Vive cada día al máximo! Mantén una actitud positiva y socializa con amigos y familia.";
  } else {
    return "Eres un sabio centenario. ¡La vida es un regalo! Continúa cuidando de tu bienestar y disfrutando la vida.";
  }
};

export const heightMessage = (height: number): string => {
  if (height < 150) {
    return `Asegúrate de mantener una dieta equilibrada y mantener un estilo de vida saludable.`;
  } else if (height < 170) {
    return `Estas en un rango de altura común. Recuerda realizar ejercicio.`;
  } else {
    return `Mantén una buena postura y realiza ejercicios para la espalda para mantener tu salud vertebral.`;
  }
};

export const weightMessage = (weight: number): string => {
  if (weight < 50) {
    return `Asegúrate de mantener una dieta nutritiva y equilibrada para mantener un peso saludable.`;
  } else if (weight < 70) {
    return `Tu peso esta dentro de un rango promedio. Manten tu peso equilibrando una dieta saludable y ejercicio.`;
  } else {
    return `Mantén un equilibrio entre la dieta y el ejercicio para mantener un peso saludable.`;
  }
};

export const dietaryPreferenceMessage = (dietaryPreference: string): string => {
  switch (dietaryPreference) {
    case "NA":
      return `No tienes preferencia de dieta en particular. Puedes mantener una dieta equilibrada comiendo una variedad de alimentos. Incluye proteínas magras, frutas, verduras y granos enteros en tus comidas diarias para obtener una nutrición completa y mantener un estilo de vida saludable.`;

    case "Vegetariano":
      return `Eres vegetariano. Tu dieta excluye carne, pero aún puedes disfrutar de una amplia variedad de alimentos. Asegúrate de incluir frutas, verduras, granos, nueces y productos lácteos en tu alimentación para obtener una nutrición equilibrada y satisfacer tus necesidades nutricionales.`;

    case "Vegano":
      return `Sigues una dieta vegana, lo que significa que no consumes ningún producto animal, incluyendo carne, leche y huevos. Opta por alimentos a base de plantas, como frutas, verduras, legumbres y alternativas de leche vegetal. Asegúrate de tomar suplementos de vitamina B12 y planificar tus comidas para obtener todos los nutrientes necesarios para mantenerte saludable.`;

    case "Sin Lactosa":
      return `Tienes una dieta sin lactosa. Esto implica evitar los productos lácteos que contienen lactosa y buscar alternativas sin lactosa, como leche de almendras o soja. Asegúrate de mantener una ingesta adecuada de calcio y otros nutrientes importantes al elegir productos sin lactosa y alimentos ricos en nutrientes.`;

    default:
      return "No tienes preferencia de dieta en particular. Mantén una alimentación equilibrada y diversa para cuidar de tu salud.";
  }
};

type AllergyMessages = {
  [allergy: string]: string;
};

export const generateAllergyMessage = (allergy: string): string => {
  const allergyMessages: AllergyMessages = {
    "Frutos Secos":
      "Eres alérgico a los frutos secos. Evita alimentos que contengan frutos secos o trazas de frutos secos para prevenir reacciones alérgicas.",
    "Productos Lácteos":
      "Eres alérgico a los productos lácteos. Evita alimentos lácteos y busca alternativas sin lactosa.",
    "Trigo y Gluten":
      "Eres alérgico al trigo y gluten. Evita alimentos que contengan trigo y gluten para prevenir reacciones alérgicas.",
    Mariscos:
      "Eres alérgico a los mariscos. Evita alimentos que contengan mariscos para prevenir reacciones alérgicas.",
  };

  if (allergyMessages[allergy]) {
    return allergyMessages[allergy];
  } else {
    return `Tienes una alergia a ${allergy}. Evita alimentos que contengan ${allergy} para prevenir reacciones alérgicas.`;
  }
};

export const bmiCategoryDescription = (category: string): string => {
  switch (category) {
    case "Bajo peso":
      return "Esto puede ser indicativo de insuficiente nutrición.";
    case "Peso saludable":
      return "¡Sigue manteniendo una alimentación equilibrada!";
    case "Sobrepeso":
      return "Considera realizar cambios en tu alimentación y estilo de vida para mejorar tu salud.";
    case "Obesidad clase 1":
      return "Se recomienda consultar a un profesional de la salud para obtener asesoramiento.";
    case "Obesidad clase 2":
      return "Es importante buscar asesoramiento médico y hacer cambios en tu estilo de vida.";
    case "Obesidad clase 3":
      return "Es fundamental buscar asistencia médica y realizar cambios importantes en tu estilo de vida.";
    default:
      return "Tu IMC no se encuentra en una categoría definida.";
  }
};

export const mapDayNameToWeekday = (dayName: string): number => {
  switch (dayName) {
    case "Domingo":
      return 0;
    case "Lunes":
      return 1;
    case "Martes":
      return 2;
    case "Miércoles":
      return 3;
    case "Jueves":
      return 4;
    case "Viernes":
      return 5;
    case "Sábado":
      return 6;
    default:
      return 0; // Default to 0 for unknown names (e.g., Domingo)
  }
};

export const findTodayInRoutine = (
  routine: { day: string }[]
): string | null => {
  const daysOfWeek = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const today = new Date().getDay(); // Gets today's weekday index (0 for Sunday, 1 for Monday, ..., 6 for Saturday)

  const todayInSpanish = daysOfWeek[today];

  const foundDay = routine.find((dayObj) => dayObj.day === todayInSpanish);

  if (foundDay) {
    return foundDay.day; // Today's weekday in Spanish found in the routine
  } else {
    return null; // Today's weekday in Spanish not found in the routine
  }
};

// export const renderEvents = (calendarApi: any, routine: any) => {
//   if (routine) {
//     calendarApi.removeAllEvents();
//     const currentDate = calendarApi.getDate();
//     const currentYear = currentDate.getFullYear();
//     const currentMonth = currentDate.getMonth();
//     const currentDay = currentDate.getDate();

//     for (let dayIndex = 0; dayIndex < routine.length; dayIndex++) {
//       const dayFoods = routine[dayIndex].foods;
//       const dayObject = routine[dayIndex];
//       const dayName = dayObject.day;

//       for (
//         let day = currentDay;
//         day <= new Date(currentYear, currentMonth + 1, 0).getDate();
//         day++
//       ) {
//         const date = new Date(currentYear, currentMonth, day);
//         const dayWeekday = mapDayNameToWeekday(dayName);

//         if (date.getDay() === dayWeekday) {
//           dayFoods?.forEach((foodItem: FoodItem, index: number) => {
//             const event = {
//               title: `${foodItem.name} | Cantidad (${foodItem.quantity})`,
//               start: date,
//               end: date,
//               id: `food-event-${dayName}-${index}-${day}`,
//             };
//             calendarApi.addEvent(event);
//           });
//         }
//       }
//     }
//   }
// };

export const renderEvents = (calendarApi: any, routine: any) => {
  if (routine) {
    calendarApi.removeAllEvents();
    const currentDate = calendarApi.getDate();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    routine.forEach((dayObject: any) => {
      const dayFoods = dayObject.foods;
      const dayName = dayObject.day;

      for (let day = currentDay; day <= (currentDay + 6); day++) {
        const date = new Date(currentYear, currentMonth, day);
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        if (day <= lastDayOfMonth) {
          const dayWeekday = mapDayNameToWeekday(dayName);

          if (date.getDay() === dayWeekday) {
            dayFoods?.forEach((foodItem: FoodItem, index: number) => {
              const event = {
                title: `${foodItem.name} | Cantidad (${foodItem.quantity})`,
                start: date,
                end: date,
                id: `food-event-${dayName}-${index}-${day}`,
              };
              calendarApi.addEvent(event);
            });
          }
        }
      }
    });
  }
};

export const getCurrentDateTimeInEST = (): string => {
  const today = new Date();
  const offsetMinutes = today.getTimezoneOffset();
  const estOffsetMinutes = 5 * 60; // 5 hours * 60 minutes per hour
  const adjustedDate = new Date(
    today.getTime() - (offsetMinutes - estOffsetMinutes) * 60 * 1000
  );
  return adjustedDate.toISOString();
};

export const formatSpanishDate = (diaryDate: Date): string => {
  const date = new Date(diaryDate);
  const formattedDate = date.toLocaleString("es-CO", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const parts = formattedDate.split(" ");
  const day = parts[0].charAt(0).toUpperCase() + parts[0].slice(1); // Capitalizes the first letter
  const time = parts[6].replace(/^0/, ""); // Removes the leading zero from the hour
  const formattedString = `${day} ${parts[1]} de ${parts[3]} ${parts[4]} ${parts[5]} ${time} ${parts[7]}`;

  return formattedString;
};

export const translateMealType = (mealType: string) => {
  return mealTypeMap[mealType] || mealType;
};

export const getPointsRangeFromLevel = (
  level: Level
): { min: number; max: number } => {
  const levelPoints: LevelPoints = {
    0: { min: 0, max: 24 },
    1: { min: 25, max: 99 },
    2: { min: 100, max: 499 },
    3: { min: 500, max: 1999 },
    4: { min: 2000, max: 2000 },
  };

  return levelPoints[level];
};

export const formatISOToMonthDay = (isoDate: string): string => {
  const date = new Date(isoDate);
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");

  return `${day}/${month}`;
};

export const formatCompletedDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const day: string = date.getDate().toString().padStart(2, "0");
  const month: string = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based, so we add 1
  let hours: number = date.getHours();
  const minutes: string = date.getMinutes().toString().padStart(2, "0");

  const amOrPm: string = hours < 12 ? "a. m." : "p. m.";

  // Converts to 12-hour format
  if (hours > 12) {
    hours -= 12;
  }

  const formattedDate: string = `${day}/${month} - ${hours
    .toString()
    .padStart(2, "0")}:${minutes} ${amOrPm}`;

  return formattedDate;
};

export const getStartOfWeek = () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 for Sunday, 1 for Monday, etc.

  // Calculates the number of days to subtract to get to the start of the week (Monday)
  const daysToSubtract = (dayOfWeek + 6) % 7;

  // Sets the date to the start of the week with time set to midnight
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - daysToSubtract);
  startOfWeek.setHours(0, 0, 0, 0);

  return startOfWeek.toISOString(); // Convert to ISO date format
};

export const calculateCaloriesForWeek = (foodDiary: FoodEntry[], startOfWeek: string) => {
  const today = new Date().toISOString();

  const entriesInRange = foodDiary.filter((entry: FoodEntry) => {
    const entryDate = new Date(entry.date).toISOString();
    return entryDate >= startOfWeek && entryDate <= today;
  });

  const totalCaloriesForWeek = entriesInRange.reduce(
    (total: number, entry: FoodEntry) => total + entry.totalCalories,
    0
  );

  return totalCaloriesForWeek;
};

export const calculateTotalFoodsForWeek = (foodDiary: FoodEntry[], startOfWeek: string) => {
  const today = new Date().toISOString();

  const totalFoodsForWeek = foodDiary.reduce((total, entry: FoodEntry) => {
    const entryDate = new Date(entry.date).toISOString();

    if (entryDate >= startOfWeek && entryDate <= today) {
      return total + entry.foods.length;
    }

    return total;
  }, 0);

  return totalFoodsForWeek;
};

export const calculateDailyCaloriesForWeek = (foodDiary: FoodEntry[], startOfWeek: string) => {
  const startOfWeekDate = new Date(startOfWeek);
  const startOfWeekDay = startOfWeekDate.getDay();
  const endOfWeek = new Date(startOfWeekDate);
  endOfWeek.setDate(startOfWeekDate.getDate() + (startOfWeekDay + 5));

  const dailyCaloriesForWeek = Array.from({ length: 7 }, (_, index) => {
    const currentDate = new Date(startOfWeek);
    currentDate.setDate(currentDate.getDate() + index);

    // Extract year, month, and day from currentDate
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    const entryForDate = foodDiary.find((entry: FoodEntry) => {
      const entryDate = new Date(entry.date);
      // Extract year, month, and day from entryDate
      const entryYear = entryDate.getFullYear();
      const entryMonth = entryDate.getMonth();
      const entryDay = entryDate.getDate();

      // Compare year, month, and day
      return currentYear === entryYear && currentMonth === entryMonth && currentDay === entryDay;
    });

    return entryForDate ? entryForDate.totalCalories : 0;
  });

  return dailyCaloriesForWeek;
};

export const countFoodTypesInFoodDiary = (foodDiary: FoodEntry[], startOfWeek: string) => {
  const today = new Date();
  const foodTypeCounts: { [key: string]: number } = {};

  // Iterates through each entry in foodDiary
  foodDiary.forEach((entry: FoodEntry) => {
    // Checks if the entry falls within the current week date range
    const entryDate = new Date(entry.date);
    if (entryDate >= new Date(startOfWeek) && entryDate <= today) {
      // Iterates through the foods array in each entry
      entry.foods.forEach((food) => {
        // Uses the food name as the key in the foodTypeCounts object
        const foodName = food.name;

        // Increments the count for the corresponding food type
        if (foodTypeCounts[foodName]) {
          foodTypeCounts[foodName]++;
        } else {
          foodTypeCounts[foodName] = 1;
        }
      });
    }
  });

  // Convert the foodTypeCounts object to an array of objects
  const countsArray = Object.entries(foodTypeCounts).map(([name, count]) => ({
    name,
    count,
  }));

  // Sort the array based on the count in descending order
  countsArray.sort((a, b) => b.count - a.count);

  return countsArray;
};

export const getStartOfMonth = () => {
  const today = new Date();

  // Set the date to the first day of the current month with time set to midnight
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  startOfMonth.setHours(0, 0, 0, 0);

  return startOfMonth.toISOString(); // Convert to ISO date format
};

export const getCompletedTasksForMonth = (taskHistory: TaskHistory[], startOfMonth: string) => {
  const today = new Date();
  const startOfMonthDate = new Date(startOfMonth); // Convert startOfMonth to a Date object

  // Filters task history entries based on the completed date range
  const completedTasksForMonth = taskHistory.filter((task: TaskHistory) => {
    const completedDate = new Date(task.completedDate); // Convert completedDate to Date object

    // Check if the completed date is within the range of the current month and if it was completed on time.
    return (completedDate >= startOfMonthDate && completedDate <= today) && task.completedOnTime;
  });

  return completedTasksForMonth.length;
};

export const countMealTypesInFoodDiary = (foodDiary: FoodEntry[]): MealTypeCounts => {
  // Initialize an object to keep track of mealType counts
  const mealTypeCounts: any = {
    NA: 0,
    breakfast: 0,
    lunch: 0,
    dinner: 0,
    snack: 0,
  };

  // Iterate through each entry in foodDiary
  foodDiary.forEach((entry) => {
    // Iterate through the foods array in each entry
    entry.foods.forEach((food) => {
      // Increment the count for the corresponding mealType
      mealTypeCounts[food.mealType]++;
    });
  });

  // Return the mealType counts
  return mealTypeCounts;
};
