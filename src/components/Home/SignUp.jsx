import React, { useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { setToken } from '../../features/bookSlice';

const SignUp = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        username:'',
        password:'',
    }); 
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };
    const [error, setError] = useState(null);
  const handleSignUp = async (e)=>{
    e.preventDefault();
        try {
          const response = await fetch(`https://pustakalaya-api.vercel.app/books/signup`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          if (response.ok) {
            console.log('User created successfully');
            handleSignIn()
            setError(null);
          }
          else{
            throw new Error('Failed to create user');
          }  
        } catch (error) {
          console.error('Error submitting data:', error);
          setError('Failed to create user. Please try again.');
        }
  }
  const handleSignIn = async (e)=>{
    e.preventDefault();
        try {
          const response = await fetch(`https://pustakalaya-api.vercel.app/books/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          if (response.ok) {
            console.log('User loggedIn successfully');
            const data = await response.json();
            const token = data.token;
            dispatch(setToken(token));
            console.log(token);
            setFormData({
            username: '',
            password: '',
            });
            setError(null);
        }
        else{
            throw new Error('Failed to create user');
        }
        } catch (error) {
          console.error('Error submitting data:', error);
          setError('Failed to create user. Please try again.');
        }
  }    
  return (
    <div className="bg-gray-300 flex justify-center items-center" style={{height:'90vh'}}>
  <div className="bg-gray-300 shadow-lg rounded-lg p-8 max-w-md w-full">
    <h1 className="text-l font-bold mb-4">Sign Up</h1>
    {error && <p className="text-red-500 mb-4">{error}</p>}
    <form className="space-y-4" onSubmit={handleSignUp}>
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          placeholder="Enter your username"
          onChange={handleInputChange}
          value={formData.username}
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          placeholder="Enter your password"
          required
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit"className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
        Sign Up
      </button>
    </form>
    <button type="button" onClick={handleSignIn}className="w-full mt-2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
        Sign In
      </button>
  </div>
</div>
  )
}

export default SignUp
