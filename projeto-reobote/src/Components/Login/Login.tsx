import { useState } from 'react';
import { login } from '../../actions/login';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import Register from '../Register';
import { useNavigate } from 'react-router-dom';


function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [action, setAction] = useState('Registre-se')
  const navigate = useNavigate()
  //   const [type, setType] = useState('password');
  // const [icon, setIcon] = useState(eyeOff);
  
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
   
    await login({ email, password })
    .then((response) => 
      { 
        window.localStorage.setItem("access_token", response.access_token)
        window.localStorage.setItem("token_type", response.token_type)
      })
      .then(()=>{
        navigate("/dashboard")
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
                action === 'Login' ? <><div className='bg-[#edcfc4] flex items-center gap-5 my-4 p-4 rounded'>
                  <MdEmail className='text-[#f1a598] text-xl' />
                  <input
                    className='bg-transparent border-none outline-none'
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder='Seu email' />
                </div><div className='bg-[#edcfc4] flex items-center gap-5 my-4 p-4 rounded'>

                    <RiLockPasswordFill className='text-[#f1a598] text-xl' />
                    <input
                      className='bg-transparent border-none outline-none'
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder='Sua senha' />
                  </div>
                  {error && <p className='text-red-700'>{error}</p>}
                  <div><p>Esqueceu sua senha? <span className='text-yellow-500 cursor-pointer'>Clique aqui</span></p></div>
                  <div className='flex justify-center gap-10 mt-10'>
                    <button className='bg-[#f1a598] text-white text-xl py-2 w-36 rounded-3xl' onClick={handleSubmit} type="submit">Entrar</button>
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
