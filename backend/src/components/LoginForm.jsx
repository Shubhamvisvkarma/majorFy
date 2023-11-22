import React, { useState } from 'react';
import axios from 'axios'; // Import the axios library
import QuizForm from './QuizForm';
import StudentQuizForm from './StudentQuizForm';

const LoginForm = () => {
  // State to manage form input values
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  // State to manage form validation errors
  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });

  // State to manage login status
  const [loginStatus, setLoginStatus] = useState('');

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Reset the corresponding validation error when the user types
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic form validation
    let formIsValid = true;
    const newErrors = { ...errors };

    if (formData.username.trim() === '') {
      formIsValid = false;
      newErrors.username = 'Username is required';
    }

    if (formData.password.trim() === '') {
      formIsValid = false;
      newErrors.password = 'Password is required';
    }

    // Set validation errors if any
    setErrors(newErrors);

    // If the form is valid, make a request to the backend using axios
    if (formIsValid) {
      try {
        const response = await axios.post('http://localhost:3001/login', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          // Successful login
          setLoginStatus('success');
        } else {
          // Unsuccessful login
          setLoginStatus('error');
        }
      } catch (error) {
        console.error('Error during login:', error);
        setLoginStatus('error');
      }
    }
  };

  // Render login success component if login is successful
  if (loginStatus === 'success') {
    return (
      <div>
        <QuizForm/>
        {/* Render additional content or redirect to another page as needed */}
      </div>
    );
  }

  return (
    <div>
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
          <span style={{ color: 'red' }}>{errors.username}</span>
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <span style={{ color: 'red' }}>{errors.password}</span>
        </div>

        <button type="submit">Login</button>
      </form>
     
      
      {loginStatus === 'error' && <p style={{ color: 'red' }}>Invalid username or password</p>}
    </div>
  );
};

export default LoginForm;
