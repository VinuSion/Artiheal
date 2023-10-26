import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { AxiosError } from 'axios';
import { isToday, isValid, parse, format } from "date-fns";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getError = (error: AxiosError) => {
  if (error.response && error.response.data) {
    const responseData = error.response.data;
    if (typeof responseData === 'object' && 'message' in responseData) {
      return responseData.message;
    }
  }
  return error.message;
};

export const Range = (start: number, end: number, step: number = 1): number[] => {
  const range = [];
  for (let i = start; i <= end; i += step) {
    range.push(i);
  }
  return range;
}

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
    "Frutos Secos": "Eres alérgico a los frutos secos. Evita alimentos que contengan frutos secos o trazas de frutos secos para prevenir reacciones alérgicas.",
    "Productos Lácteos": "Eres alérgico a los productos lácteos. Evita alimentos lácteos y busca alternativas sin lactosa.",
    "Trigo y Gluten": "Eres alérgico al trigo y gluten. Evita alimentos que contengan trigo y gluten para prevenir reacciones alérgicas.",
    "Mariscos": "Eres alérgico a los mariscos. Evita alimentos que contengan mariscos para prevenir reacciones alérgicas.",
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
