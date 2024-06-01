import axios from 'axios';
import axiosInstance from '../api/axiosConfig';
import * as z from 'zod';

// Schema de validação
const RegisterSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    password_confirmation: z.string().min(6),

})

export const register = async (values: unknown) => {
    // Valida os campos de entrada usando o schema definido
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        // Retorna a primeira mensagem de erro de validação
        return { error: validatedFields.error.errors[0].message };
    }
    // Extrai os campos validados dos dados de entrada
    const { name, email, password, password_confirmation } = validatedFields.data;

    try {
        // Faz uma requisição POST para a rota /register com os dados do usuário
        const response = await axiosInstance.post('/register', {
            name,
            email,
            password,
            password_confirmation
        });


        return response.data; // Contém a mensagem de sucesso
    } catch (error) {
        if (axios.isAxiosError(error)) {
            
            if (error.response) {
                const { password, email } = error.response.data || {};
            // Verifica se há mensagens de erro específicas para senha e email
                if (password) {
                    return { error: password[0] };
                }

                if (email) {
                    return { error: email[0] };
                }

                return { error: 'Unknown error occurred.' };
                // Retorna uma mensagem de erro genérica se não houver erros específicos
            } else if (error.request) {
                // A solicitação foi feita, mas nenhuma resposta foi recebida
                return { error: 'No response from server. Please try again later.' };
            } else {
                // Algo aconteceu na configuração da solicitação que desencadeou um erro
                return { error: 'Error setting up request. Please try again.' };
            }
        } else {
            // Lida com erros inesperados
            console.error('Unexpected error:', error);
            return { error: 'An unexpected error occurred. Please try again.' };
        }
    }
};