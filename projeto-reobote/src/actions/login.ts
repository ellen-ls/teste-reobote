import axios from 'axios';
import axiosInstance from '../api/axiosConfig'

import { z } from 'zod';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const login = async (values: unknown) => {
  console.log(values); // log on server (npm)

  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  try {
    const response = await axiosInstance.post(`/login`, {
      email,
      password,
      persistent: true

    });

    return response.data; // Contains success and redirectTo
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Server responded with a status other than 200 range
        return { error: error.response.data.error || 'Something went wrong!' };
      } else if (error.request) {
        // Request was made but no response was received
        return { error: 'No response from server. Please try again later.' };
      } else {
        // Something happened in setting up the request that triggered an error
        return { error: 'Error setting up request. Please try again.' };
      }
    } else {
      console.error('Unexpected error:', error);
      return { error: 'An unexpected error occurred. Please try again.' };
    }
  }
};