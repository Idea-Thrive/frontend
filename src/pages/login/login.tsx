import React, { useEffect } from 'react';
import { hasToken } from 'service/auth';
import { useNavigate } from 'react-router-dom';
import { setItem } from '../../utils/storage';
import storageKeys from '../../service/storage';

function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    if (hasToken()) {
      navigate('/home', { replace: true });
    }
  }, []);

  const handleLoginClick = () => {
    setItem(storageKeys.token, 'test');
  };

  return (
    <div>
      <h2>Login</h2>

      <button onClick={handleLoginClick}>login</button>
    </div>
  );
}

export default Login;
