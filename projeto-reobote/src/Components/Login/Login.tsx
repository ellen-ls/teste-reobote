import React, { useState } from 'react';
import { login } from '../../actions/login';



function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const result = await login({ email, password });

    if (result.error) {
      setError(result.error);
    } else {
      window.location.href = result.redirectTo;
    }
  };


  return (
  
    <div>
    <h1>Login</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p>{error}</p>}
      <button type="submit">Login</button>
    </form>
  </div>
);
}
  

export default Login
