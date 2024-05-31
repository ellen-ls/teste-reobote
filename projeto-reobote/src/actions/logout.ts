import axiosInstance from "../api/axiosConfig";


export const logout = async () => {
    const currentUser = localStorage.getItem('user')
    const token = localStorage.getItem('access_token')
    const tokenType = localStorage.getItem('token_type')

    await axiosInstance.post(`/logout`, {
        email: currentUser
    }, {
        headers: { Authorization: `${tokenType} ${token}` }
    }).then(() => { 
        localStorage.removeItem('user'); 
        localStorage.removeItem('access_token'); 
        localStorage.removeItem('token_type');
        console.log("clear tokens"); 
    }).catch((e)=>{e});

}


