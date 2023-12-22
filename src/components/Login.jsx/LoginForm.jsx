import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const emailRef = React.createRef();
  const passwordRef = React.createRef();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmailError('');
    setPasswordError('');
    setLoginError('');
    setIsLoading(true);

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      console.log('User logged in successfully:', userCredential.user);
      navigate('/');

      // Close the modal after successful login
      onClose();
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === 'auth/invalid-email' || errorCode === 'auth/user-not-found') {
        setEmailError('Invalid email address');
      } else if (errorCode === 'auth/wrong-password') {
        setPasswordError('Invalid password');
      } else {
        setLoginError('Invalid credentials. Please try again.');
        console.error('Error logging in:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          required
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          ref={emailRef}
          className="text-sm w-full h-10 mb-2 p-2 border-2 border-green-950 rounded"
        />
        {emailError && <div className="text-red-500">{emailError}</div>}

        <input
          type="password"
          name="password"
          required
          placeholder="Enter a Password"
          value={formData.password}
          onChange={handleChange}
          ref={passwordRef}
          className="text-sm w-full h-10 mb-2 p-2 border-2 border-green-950 rounded"
        />
        {passwordError && <div className="text-red-500">{passwordError}</div>}
        {loginError && <div className="text-red-500">{loginError}</div>}

        <div className="flex justify-center items-center mt-4">
          <button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Logging In...' : 'Log In'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
