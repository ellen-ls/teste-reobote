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
    setSuccess('')
    setError('')
    e.preventDefault();
    const result = await register({ name, email, password, password_confirmation: passwordConfirmation });

    if (result.error) {
      setError(result.error);
      
    } else {
      setSuccess('Cadastro realizado com sucesso!');
      
      setName('')
      setEmail('')
      setPassword('')
      setPasswordConfirmation('')
    }
  };

  return (

    <div className='sm:flex justify-center items-center h-full'>
      <div className='lg:w-[450px] bg-white py-5 px-10 rounded-bl-[40px] rounded-se-[40px]'>
        <form className='w-full' id='formReset' >
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
          <div className='bg-[#edcfc4] flex items-center gap-5 my-4 p-4 rounded'>

            <RiLockPasswordFill className='text-[#f1a598] text-xl' />
            <input
              className='bg-transparent border-none outline-none'
              type={type}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder='Sua senha' />
            <span className='flex justify-around items-center text-black' onClick={handleToggle}>
              {icon === 'password' ? <IoMdEyeOff className='absolute mr-5 h-4 w-4' /> : <IoMdEye className='absolute mr-5 h-4 w-4' />}
            </span>
          </div>
          <p className='text-sm text-gray-400'>A senha precisa ter no minimo 8 caracteres</p>
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
          {error && <p className='text-red-600'>{error}</p>}
          {success && <p className='font-medium text-green-700'>{success}</p>}


          <div className='flex justify-center gap-10 mt-10'>
            <button className='bg-[#f1a598] hover:bg-[#edcfc4] text-white text-xl py-2 w-36 rounded-3xl' onClick={handleSubmit} type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>

  );
}

export default Register;