import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSignIn = async () => {
    const response = await fetch(`${import.meta.env.VITE_CLIENT_SERVER_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const { token } = await response.json();

    if (token) {
      localStorage.setItem('token', token);
      setEmail('');
      setPassword('');
    }
  }
  const handleSignUp = async () => {
    const response = await fetch(`${import.meta.env.VITE_CLIENT_SERVER_URL}/users/sign-up`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const { token } = await response.json();

    if (token) {
      localStorage.setItem('token', token);
      setName('');
      setEmail('');
      setPassword('');
      setIsLogin(true);
    }
  }
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (isLogin) handleSignIn();
    else handleSignUp();
  }

  useEffect(() => {
    if (localStorage.getItem('token')) navigate('/');
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="form full-width full-height flex flex-col flex-center p-20">
      <div className="container">
        <form className="form--data flex flex-col gap-10 w-100" onSubmit={handleFormSubmit}>
          {
            !isLogin && <input type="text" name="name" id="name" onChange={e => setName(e.target.value)} value={name} placeholder="Name" />
          }

          <input type="email" name="email" id="email" onChange={e => setEmail(e.target.value)} value={email} placeholder="Email" />
          <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)} value={password} placeholder="Password" />

          <button type="submit">{isLogin ? 'Sign In' : 'Sign Up'}</button>

          <div className="flex flex-row flex-center gap-5">
            <span className="text"> {isLogin ? 'No have account?' : 'Already has account?'} </span>
            <small className="link" type="button" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Sign Up' : 'Sign In'}
            </small>
          </div>
        </form>
      </div>
    </section>
  )
}
export default Form;