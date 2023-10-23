import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { AxiosError } from 'axios';
import { isToday, isValid, parse, format } from "date-fns";
import { date } from "zod";
 
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