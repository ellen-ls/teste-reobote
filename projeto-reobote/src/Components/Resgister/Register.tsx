import { useState } from 'react';
import { register } from '../../actions/register';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { IoPersonSharp } from "react-icons/io5";
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';



function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState('password');

  // Função para alternar entre mostrar/ocultar senha
  const handleToggle = () => {
    if (type === 'password') {
      setIcon('text')
      setType('text')
    } else {
      setIcon('password')
      setType('password')
    }
  }

// Função para lidar com o submit do formulário
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    setSuccess('')
    setError('')
    e.preventDefault();// Previna o comportamento padrão do formulário (reload da página)
    // Chama a função register com os dados do formulário
    const result = await register({ name, email, password, password_confirmation: passwordConfirmation });

    if (result.error) {
      setError(result.error);
      
    } else {
      setSuccess('Cadastro realizado com sucesso!');
      // Reseta os campos do formulário
      setName('')
      setEmail('')
      setPassword('')
      setPasswordConfirmation('')
    }
  };
// Renderiza o formulário de registro
  return (

    <div className='sm:flex justify-center items-center h-full'>
      <div className='lg:w-[450px] bg-white rounded-bl-[40px] rounded-se-[40px]'>
        <form className='w-full'>
          <div className='bg-[#edcfc4] flex items-center gap-5 my-4 p-4 rounded'>
            <IoPersonSharp className='text-[#f1a598] text-xl' />
            <input
              className='bg-transparent border-none outline-none'
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder='Seu nome' />
          </div>
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
              placeholder='Sua senha' />
            <span className='flex justify-end items-center cursor-pointer text-black' onClick={handleToggle}>
              {icon === 'password' ? <IoMdEyeOff className='absolute h-4 w-4' /> : <IoMdEye className='absolute h-4 w-4' />}
            </span>
          </div>
          <p className='text-xs text-center -mt-3 text-gray-400'>A senha precisa ter no minimo 8 caracteres</p>
          <div className='bg-[#edcfc4] flex items-center gap-5 my-4 p-4 rounded'>

            <RiLockPasswordFill className='text-[#f1a598] text-xl' />
            <input
              className='flex-auto bg-transparent border-none outline-none'
              type={type}
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
              placeholder='Confirme sua senha' />
          </div>
          {error && <p className='font-medim text-red-600 bg-red-200 rounded-2xl text-center'>{error}</p>}
          {success && <p className='font-medium text-green-700 bg-lime-100 rounded-2xl text-center'>{success}</p>}


          <div className='flex justify-center gap-10 mt-10'>
            <button className='bg-[#f1a598] hover:bg-[#edcfc4] text-white text-xl py-2 w-36 rounded-3xl' onClick={handleSubmit} type="submit">Registrar</button>
          </div>
        </form>
      </div>
    </div>

  );
}

export default Register;