import axios from 'axios';
import axiosInstance from '../api/axiosConfig'

import { z } from 'zod';
// Define o esquema de validação para os campos de login usando zod
const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
// Função assíncrona para realizar o login
export const login = async (values: unknown) => {
  

  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
// Extrai os campos validados do objeto validado
  const { email, password } = validatedFields.data;

  try {
    // Tenta enviar uma requisição POST para a rota de login
    const response = await axiosInstance.post(`/login`, {
      email,
      password,
      persistent: true // Adiciona um campo extra para a requisição

    });
// Retorna os dados da resposta em caso de sucesso
    return response.data; // Contains success and redirectTo
  } catch (error) {
    // Verifica se o erro é um erro do axios
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // O servidor respondeu com um status fora do intervalo 200
        return { error: error.response.data.error || 'Something went wrong!' };
      } else if (error.request) {
        // A requisição foi feita, mas não houve resposta
        return { error: 'No response from server. Please try again later.' };
      } else {
        // Algo aconteceu na configuração da requisição que desencadeou um erro
        return { error: 'Error setting up request. Please try again.' };
      }
      // Lida com erros inesperados que não são do axios
    } else {
      console.error('Unexpected error:', error);
      return { error: 'An unexpected error occurred. Please try again.' };
    }
  }
};