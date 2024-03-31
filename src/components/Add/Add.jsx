import React from 'react'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Add = () => {
    const navigate = useNavigate()
    const userToken = localStorage.getItem('jwtToken');
    const [formData, setFormData] = useState({
        title:null,
        author:null,
        publishYear:null,
        category:null,
        pdfFile: null
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setFormData({
          ...formData,
          pdfFile: file
      });
  };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const formDataWithFile = new FormData();
          formDataWithFile.append('title', formData.title);
          formDataWithFile.append('author', formData.author);
          formDataWithFile.append('publishYear', formData.publishYear);
          formDataWithFile.append('category', formData.category);
          formDataWithFile.append('pdf', formData.pdfFile); // Append the file
          
          const response = await fetch(`https://pustakalaya-api.vercel.app/books`, {
              method: 'POST',
              headers: {
                  'Authorization': `Bearer ${userToken}`,
              },
              body: formDataWithFile, // Send FormData object instead of JSON string
          });
          if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to submit data: ${errorMessage}`);
          }
          console.log('Data submitted successfully');
          navigate("/")
        } catch (error) {
          console.error('Error submitting data:', error);
        }
    }; 
  return (
    <div className='bg-gray-300' style={{width:'100vw',height:'100vh'}}>
        <div className="bg-gray-300 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start border" style={{width:"60vw",left:'20vw',position:'relative',top:'10vh'}}>
              {/* Form */}
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
                <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pdfFile">
                                PDF File
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="pdfFile"
                                type="file"
                                accept=".pdf" // Allow only PDF files
                                name="pdf"
                                onChange={handleFileChange}
                            />
                        </div>
                <div className="flex">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
              </form>
            </div>
        </div> 
    </div>
  )
}

export default Add
