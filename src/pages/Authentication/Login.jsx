import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Login() {
  const { login, googleLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Login success');
      navigate(from, { replace: true });
    } catch (err) {
  const msg = err?.message || err?.response?.data?.message || 'Login failed';
  toast.error(msg);
}
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      toast.success('Signed in with Google');
      navigate(from, { replace: true });
    } catch (err) {
  const msg = err?.message || err?.response?.data?.message || 'Google login failed';
  toast.error(msg);
}
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" required placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="input w-full" />
        <input type="password" required placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="input w-full" />
        <button className="btn w-full">Login</button>
      </form>
      <div className="mt-4 flex gap-2">
        <button onClick={handleGoogle} className="btn btn-outline w-full">Sign in with Google</button>
      </div>
      <p className="mt-4 text-sm">Don't have an account? <Link to="/register" className="text-teal-600">Register</Link></p>
    </div>
  );
}