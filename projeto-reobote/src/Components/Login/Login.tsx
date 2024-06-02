import { useState } from 'react';
import { login } from '../../actions/login';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Register from '../Resgister/Register';
import { useNavigate } from 'react-router-dom';




function Login() {
  // Estados locais para armazenar email, senha, mensagens de erro, ação atual (Login ou Registre-se), tipo de input (password ou text) e ícone (olho ou olho cortado)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [action, setAction] = useState('Registre-se')
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState('password');

  const navigate = useNavigate()
  // Função para alternar entre mostrar e ocultar a senha
  const handleToggle = () => {
    if (type === 'password') {
      setIcon('text')
      setType('text')
    } else {
      setIcon('password')
      setType('password')
    }
  }

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    setError('')
    e.preventDefault();// Previna o comportamento padrão do formulário (recarregar a página)

    const result = await login({ email, password }) // Chama a função login com os dados de email e senha

    if (result.error) {
      setError(result.error);

    } else {
      try {
        window.localStorage.setItem("user", email)
        window.localStorage.setItem("access_token", result.access_token)
        window.localStorage.setItem("token_type", result.token_type)
        navigate("/dashboard")// Navega para a página de dashboard em caso de sucesso

      }
      catch {
        console.log('error', result.error); setError(result.error);
      }
    }
  }


  return (

    <div className='bg-banner-imagem bg-cover h-full'>

      <div className='sm:flex justify-center items-center h-full py-10'>
        <div className='lg:w-[450px] bg-white rounded-bl-[40px] rounded-se-[40px]'>
          <div className='flex'>
            <button className={`text-white text-xl py-2 w-1/2 ${action === 'Registre-se' ? 'bg-yellow-500 drop-shadow-[0_4px_3px_rgba(0,0,0,0.4)]' : 'bg-[#f1a598]'}`} type="submit" onClick={() => setAction('Registre-se')}>Registre-se</button>
            <button className={`text-white text-xl py-2 w-1/2 ${action === 'Login' ? 'bg-yellow-500 rounded-se-[40px] drop-shadow-[0_4px_3px_rgba(0,0,0,0.4)]' : 'bg-[#f1a598] rounded-se-[40px] '}`} type="submit" onClick={() => setAction('Login')}>Login</button>
          </div>
          <div className='pb-5 px-10'>
            <div className='bg-login-imagem bg-contain bg-center bg-no-repeat h-60'></div>
            <h1 className='text-3xl text-[#f1a598] text-center mb-6 mt-6 transition-all'>{action}</h1>

            {
              action === 'Login' ? (
                <form className='w-full'>
                  <div className='bg-[#edcfc4] flex items-center gap-5 my-4 p-4 rounded'>
                    <MdEmail className='text-[#f1a598] text-xl' />
                    <input
                      className='bg-transparent border-none outline-none'
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder='Seu email' />
                  </div>
                  <div className='bg-[#edcfc4] flex items-center gap-5 my-4 p-4 rounded relative'>

                    <RiLockPasswordFill className='text-[#f1a598] text-xl' />
                    <input
                      className='bg-transparent border-none outline-none flex-1'
                      type={type}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder='Sua senha'
                    />
                    <span className='flex justify-around items-center cursor-pointer text-black' onClick={handleToggle}>
                      {icon === 'password' ? <IoMdEyeOff className='absolute h-4 w-4' /> : <IoMdEye className='absolute h-4 w-4' />}
                    </span>

                  </div>
                  {error && <p className='font-medim text-red-600 bg-red-200 rounded-2xl text-center'>{error}</p>}
                  <div><p>Esqueceu sua senha? <span className='text-yellow-500 cursor-pointer hover:text-yellow-300'>Clique aqui</span></p></div>
                  <div className='flex justify-center gap-10 mt-10'>
                    <button className='bg-[#f1a598] hover:bg-[#edcfc4] text-white text-xl py-2 w-36 rounded-3xl' onClick={handleSubmit} type="submit">Entrar</button>
                  </div>


                </form>
              ) : (<Register />
              )}
          </div>
        </div>
      </div>
    </div>
  );
}


export default Login


