import { useState } from 'react';
import { register } from '../actions/register';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { IoPersonSharp } from "react-icons/io5";


function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);


  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const result = await register({ name, email, password, password_confirmation: passwordConfirmation });

    if (result.error) {
      setError(result.error);
      setSuccess(null);
    } else {
      setSuccess(result.success);
      setError(null);
    }
  };

  return (

<div className='sm:flex justify-center items-center h-full'>
      <div className='lg:w-[450px] bg-white py-5 px-10 rounded-bl-[40px] rounded-se-[40px]'>
        <form className='w-full' onSubmit={handleSubmit}>
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder='Sua senha' />
          </div>

          <div className='bg-[#edcfc4] flex items-center gap-5 my-4 p-4 rounded'>

            <RiLockPasswordFill className='text-[#f1a598] text-xl' />
            <input
              className='bg-transparent border-none outline-none'
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
              placeholder='Confirme sua senha' />
          </div>
          {error && <p>{error}</p>}
          {success && <p>{success}</p>}

          <div className='flex justify-center gap-10 mt-10'>
            <button className='bg-[#f1a598] text-white text-xl py-2 w-36 rounded-3xl' type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>

  );
}

export default Register;