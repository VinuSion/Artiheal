import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { AxiosError } from 'axios';
 
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
