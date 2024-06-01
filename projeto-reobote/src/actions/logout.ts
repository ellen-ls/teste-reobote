import axiosInstance from "../api/axiosConfig";


export const logout = async () => {
    // Obtém o usuário atual, o token de acesso e o tipo de token do localStorage
    const currentUser = localStorage.getItem('user')
    const token = localStorage.getItem('access_token')
    const tokenType = localStorage.getItem('token_type')

// Tenta enviar uma requisição POST para a rota de logout
    await axiosInstance.post(`/logout`, {
        email: currentUser // Envia o email do usuário atual no corpo da requisição
    }, {
        headers: { Authorization: `${tokenType} ${token}` } // Configura o cabeçalho de autorização com o token de acesso
    }).then(() => { 
        // Se a requisição for bem-sucedida, remove os itens do localStorage
        localStorage.removeItem('user'); 
        localStorage.removeItem('access_token'); 
        localStorage.removeItem('token_type');
        console.log("clear tokens"); 
        // Lida com qualquer erro que possa ocorrer durante a requisição
    }).catch((e)=>{e});

}


