import React, { useContext, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import googleIcon from '../..public/g-icon';
import Carosal from '../components/Signup.jsx/Carosal';
import Form from '../components/Signup.jsx/Form';
import { AuthContext } from '../context/AuthContext';
import { db, auth, googleProvider } from '../firebase/config';
import { signInWithPopup, updateProfile } from 'firebase/auth';
import {  doc, serverTimestamp, setDoc } from 'firebase/firestore';

const Signup = ({ formActive, handleCloseModal, handleFormActive, handlePage }) => {
  const [signInError, setSignInError] = useState(null);
  const { setAsUser } = useContext(AuthContext);

  // Form data and errors state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    // Validate email
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    }

    // Validate password
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
      isValid = false;
    }

    // Validate confirmPassword
    if (!formData.confirmPassword.trim()) {
      errors.confirmPassword = 'Confirm Password is required';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await updateProfile(user, { displayName: user.displayName })

      const userData = {
        Username: user.displayName,
        Email: user.email,
        CreatedAt: serverTimestamp(),
      };

      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, userData);






      setAsUser(user);
      handleCloseModal();
    } catch (error) {
      console.error('Google Sign-In Error:', error.message);
      setSignInError(error.message);
    }
  };

  const handleSignup = () => {
    // Validate the form before submitting
    if (validateForm()) {
      // Your signup logic here
      console.log('Form is valid. Perform signup operation.');
    }
  };

  return (
    <>
        <div onClick={handleCloseModal} className="flex justify-end items-center p-2">
          <span className='font-sans'>Sign In Page</span>
          <AiOutlineClose className="text-xl" />
        
      </div>
      <div className="p-4">
        <div className="p-0">
          <Carosal />
        </div>
        <div className="mt-8">
          {!formActive && (
            <button
              onClick={handleFormActive}
              className="bg-white border-2 my-3 border-green-950 w-full py-2 rounded text-start"
            >
              <span><i className="fas fa-mobile-alt mx-2 "></i></span>Continue with Email
            </button>
          )}
          {formActive && (
            <Form
              formData={formData}
              formErrors={formErrors}
              onInputChange={handleInputChange}
              onSubmit={handleSignup}
              onClose={handleCloseModal}
            />
          )}
          <div className="flex justify-center ">
            <h1 className="font-bold font-mono text-green-950 P-3"> OR </h1>
          </div>
          <button onClick={handleGoogleSignIn} className="bg-white border border-black w-full h-10 py-2 rounded ">
            <span className="flex justify-start ml-2">
              <img
                className="w-[20px] h-auto mr-2"
                src={googleIcon}
                alt="g-icon"
              />
              Continue with Google
            </span>
          </button>
          {/* Display the error message if there is one */}
          {signInError && (
            <p className="text-red-500 mt-2">{signInError}</p>
          )}
          <h3 className='cursor-pointer'>
            Already have an Account ?{' '}
            <span onClick={handlePage} className="cursor-pointer text-blue-800 underline"> Click here</span>
          </h3>
        </div>
      </div>
    </>
  );
}

export default Signup;
