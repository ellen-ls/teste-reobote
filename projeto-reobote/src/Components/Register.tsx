import { useState } from 'react';
import { register } from '../actions/register';


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
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
        </div>
        {error && <p>{error}</p>}
        {success && <p>{success}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;