import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from "../../firebase/config";
import { useNavigate } from 'react-router-dom';

const Form = ({ onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    number: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({
    username: '',
    email: '',
    password: '',
    existingUser: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormErrors({
      username: '',
      email: '',
      password: '',
      existingUser: '',
    });

    const regex = /^[a-zA-Z\s]+$/;

    if (!formData.username.trim() || !regex.test(formData.username)) {
      setFormErrors((prevErrors) => ({ ...prevErrors, username: 'Please enter a valid username.' }));
      return;
    }

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);

  
      const userData = {
        Username: formData.username,
        Email: formData.email,
        Number: formData.number,
        CreatedAt: serverTimestamp(),
      };

      await updateProfile(userCredential.user, { displayName: formData.username });

      const userDocRef = doc(db, "users", userCredential.user.uid);
      console.log(userDocRef,"f")
      await setDoc(userDocRef, userData);
      setSuccessMessage('User registered successfully!');

      // Navigate to home after 3 seconds
      setTimeout(() => {
        console.log('Navigating to home');
        onClose();
      }, 2000);

      console.log('User registered successfully!', userDocRef.id);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === 'auth/invalid-email' || errorCode === 'auth/weak-password') {
        setFormErrors((prevErrors) => ({ ...prevErrors, email: 'Invalid email or weak password.' }));
      } else if (errorCode === 'auth/email-already-in-use') {
        setFormErrors((prevErrors) => ({ ...prevErrors, existingUser: 'Email already in use.' }));
      } else {
        console.error('Error registering user:', error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          required
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="text-sm w-full h-10 p-2 mb-2 border-2 border-green-950 rounded"
        />
        {formErrors.username && <div className="text-red-500">{formErrors.username}</div>}

        <input
          type="email"
          required
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="text-sm w-full h-10 mb-2 p-2 border-2 border-green-950 rounded"
        />
        {formErrors.email && <div className="text-red-500">{formErrors.email}</div>}

        <input
          type="number"
          required
          name="number"
          placeholder="Enter Number"
          value={formData.number}
          onChange={handleChange}
          className="text-sm w-full h-10 p-2 mb-2 border-2 border-green-950 rounded"
        />

        <input
          type="password"
          name="password"
          required
          placeholder="Enter a Password"
          value={formData.password}
          onChange={handleChange}
          className="text-sm w-full h-10 mb-2 p-2 border-2 border-green-950 rounded"
        />
        {formErrors.password && <div className="text-red-500">{formErrors.password}</div>}
        {formErrors.existingUser && <div className="text-red-500">{formErrors.existingUser}</div>}
        {successMessage && <div className="text-green-500">{successMessage}</div>}

        <div className="flex justify-center items-center mt-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
