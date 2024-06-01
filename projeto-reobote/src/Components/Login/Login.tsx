import { useState } from 'react';
import { login } from '../../actions/login';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdEye, IoMdEyeOff} from "react-icons/io";
import Register from '../Resgister/Register';
import { useNavigate } from 'react-router-dom';




function Login() {
// Estados locais para armazenar email, senha, mensagens de erro, ação atual (Login ou Registre-se), tipo de input (password ou text) e ícone (olho ou olho cortado)
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [action, setAction] = useState('Registre-se')
  const navigate = useNavigate()
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState('password');

  // Função para alternar entre mostrar e ocultar a senha
  const handleToggle = () => {
    if (type==='password'){
       setIcon('text')
       setType('text')
    } else {
      setIcon('password')
      setType('password')
    }
 }
  
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();// Previna o comportamento padrão do formulário (recarregar a página)
   
    await login({ email, password }) // Chama a função login com os dados de email e senha
    .then((response) => 
      { 
        window.localStorage.setItem("user", email)
        window.localStorage.setItem("access_token", response.access_token)
        window.localStorage.setItem("token_type", response.token_type)
      })
      .then(()=>{
        navigate("/dashboard")// Navega para a página de dashboard em caso de sucesso
      })
      .catch((e) => { console.log('error', error); setError(e) });
  };

  return (

    <div className='bg-banner-imagem bg-cover h-full'>

      <div className='sm:flex justify-center items-center sm:py-5 h-full'>
        <div className='lg:w-[450px] bg-white rounded-bl-[40px] rounded-se-[40px]'>
          <div className='flex'>
            <button className={`text-white text-xl py-2 w-1/2 ${action === 'Registre-se' ? 'bg-[#f1a598] drop-shadow-[0_4px_3px_rgba(0,0,0,0.4)]' : 'bg-[#edcfc4]'}`} type="submit" onClick={() => setAction('Registre-se')}>Registre-se</button>
            <button className={`text-white text-xl py-2 w-1/2 ${action === 'Login' ? 'bg-[#f1a598] rounded-se-[40px] drop-shadow-[0_4px_3px_rgba(0,0,0,0.4)]' : 'bg-[#edcfc4] rounded-se-[40px] '}`} type="submit" onClick={() => setAction('Login')}>Login</button>
          </div>
          <div className='pb-5 px-10'>
            <div className='bg-login-imagem bg-contain bg-center bg-no-repeat h-60'></div>
            <h1 className='text-3xl text-[#f1a598] text-center mb-6 mt-6 transition-all'>{action}</h1>
            <form className='w-full'>
              {
                action === 'Login' ? <>
                <div className='bg-[#edcfc4] flex items-center gap-5 my-4 p-4 rounded'>
                  <MdEmail className='text-[#f1a598] text-xl' />
                  <input
                    className='bg-transparent border-none outline-none'
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder='Seu email'/>
                </div>
                <div className='bg-[#edcfc4] flex items-center gap-5 my-4 p-4 rounded'>

                    <RiLockPasswordFill className='text-[#f1a598] text-xl' />
                    <input
                      className='flex-auto bg-transparent border-none outline-none'
                      type={type}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder='Sua senha'
                      />
                       <span className='flex justify-around items-center text-black' onClick={handleToggle}>
                        {icon==='password' ? <IoMdEyeOff className=' mr-5 ml-auto h-4 w-4'/> : <IoMdEye  className=' mr-5 ml-auto h-4 w-4'/>}
                       </span>

                  </div>
                  {error && <p className='text-red-700'>{error}</p>}
                  <div><p>Esqueceu sua senha? <span className='text-yellow-500 cursor-pointer hover:text-yellow-300'>Clique aqui</span></p></div>
                  <div className='flex justify-center gap-10 mt-10'>
                    <button className='bg-[#f1a598] hover:bg-[#edcfc4] text-white text-xl py-2 w-36 rounded-3xl' onClick={handleSubmit} type="submit">Entrar</button>
                  </div>
                </>
                  : <Register />
              }
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Login
