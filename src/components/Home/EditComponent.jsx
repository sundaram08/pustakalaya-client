import React from 'react'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const EditComponent = ({bookId,onClose}) => {
  const [formData, setFormData] = useState({
    title:'',
    author:'',
    publishYear:'',
    category:''
  });
  const userToken = localStorage.getItem('jwtToken');
    useEffect(() => {
        const fetchBookData = async () => {
          try {
            const response = await fetch(`https://pustakalaya-api.vercel.app/books/${bookId}`,{
              headers: {
                'Content-Type': 'application/json',
              },
            })
            const data = await response.json();
            if (data && typeof data === 'object') {
              setFormData({
                title: data.title || '',
                author: data.author || '',
                publishYear: data.publishYear || '',
                category: data.category || ''
              });
            } else {
              console.error('Invalid book data:', data);
            }
          } catch (error) {
            console.error('Error fetching book data:', error);
          }
        };
    
        fetchBookData();
      }, [bookId]);
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch(`http://localhost:4000/books/${bookId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userToken}`
            },
            body: JSON.stringify(formData),
          });
          if (!response) {
            throw new Error('Failed to submit data');
          }
          console.log('Data submitted successfully');
          onClose();
        } catch (error) {
          console.error('Error submitting data:', error);
        }
      }; 
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          
          <div className="absolute top-0 right-0 mt-4 mr-4">
            <button
              onClick={onClose}
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
       
          <div className="bg-gray-300 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
           
              <form onSubmit={handleSubmit} className="w-full">
              <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                    Title
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Title"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
                    Author
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="author"
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    placeholder="Author"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="publishYear">
                    Publish Year
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="publishYear"
                    type="number"
                    name="publishYear"
                    value={formData.publishYear}
                    onChange={handleInputChange}
                    placeholder="Publish Year"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                    Category
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="category"
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="Category"
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="bg-gray-300 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={handleSubmit}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditComponent
