import React, { useState } from 'react'
import { useEffect} from 'react';
import EditComponent from './EditComponent';
import {useDispatch,useSelector} from 'react-redux'
import { setSliceBooks } from '../../features/bookSlice';

const Home = () => {
  const dispatch = useDispatch();
  const allBooks = useSelector((state) => state.book.books);
  const selectedCategory = useSelector((state) => state.book.selectedCategory); 
  const searchedText = useSelector((state) => state.book.searchedText);
  const [books,setBooks] = useState([])
  const [editBookId, setEditBookId] = useState(null);

  const handleEditClick = (id) => {
    setEditBookId(id);
    console.log("Edit button clicked for book ID:",id);
  };

  const handleEditComponentClose = () => {
    setEditBookId(null);
    fetchData(); 
  };
  const userToken = localStorage.getItem('jwtToken');
  const handleDelete= async  (id) =>{
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        };
        const response = await fetch(`https://pustakalaya-api.vercel.app/books/${id}`, {
        method: 'DELETE',
        headers: headers 
        });
        if (response) {
          alert(`Book deleted successfully.`);
          fetchData()
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Failed to delete book');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
      alert('An error occurred while deleting the book.Make sure you are logged in.');
    }
  }
  const fetchData = async () => {
      try {
        const response = await fetch('https://pustakalaya-api.vercel.app/books',{

      });
        const data = await response.json();
        setBooks(data);
        dispatch(setSliceBooks(data))
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    useEffect(() => {
      fetchData();
    }, [dispatch]);  

    const handleAddToFav = async (bookId) => {
      let userId = localStorage.getItem('userID');
  
      try {
          const response = await fetch('https://pustakalaya-api.vercel.app/books/user/fav', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json' 
              },
              body: JSON.stringify({ 
                  userId: userId,
                  bookId: bookId
              })
          });
  
          if (response.ok) { 
              const data = await response.json(); 
              alert('Book successfully added to Favorites');
          } else {
              const errorData = await response.json();
              throw new Error(errorData.message);
          }
      } catch (error) {
          console.error('Error adding book to Favorites:', error.message);
          alert('Failed to add book to Favorites. Please try again later.');
      }
  };
  
    const filteredBooks = (searchedText && searchedText.trim() !== '')
    ? (selectedCategory === 'all'
      ? allBooks.filter(book => 
          book && typeof book === 'object' &&
          (book.title.toLowerCase().includes(searchedText.toLowerCase()) ||
          book.author.toLowerCase().includes(searchedText.toLowerCase()) ||
          book.publishYear.toString().includes(searchedText.toLowerCase()) ||
          (book.category && book.category.toLowerCase().includes(searchedText.toLowerCase())))
        )
      : allBooks.filter(book => 
          book && typeof book === 'object' &&
          book.category === selectedCategory &&
          (book.title.toLowerCase().includes(searchedText.toLowerCase()) ||
          book.author.toLowerCase().includes(searchedText.toLowerCase()) ||
          book.publishYear.toString().includes(searchedText.toLowerCase()) ||
          (book.category && book.category.toLowerCase().includes(searchedText.toLowerCase())))
        )
    )
    : (selectedCategory === 'all' ? allBooks : allBooks.filter(book => book && book.category === selectedCategory));
  
 
  return (
    <div className='bg-gray-300' style={{ height: '100vh', width: '100vw', position: 'relative',top:'0.1vh' }}>
      {userToken ? (
  null
) : (
  <h1 className='grid place-items-center text-red-500 custom-text md:text-sm lg:text-lg p-2'>Make sure you are Logged in for full functionality!</h1>
)}

      <ul className="flip-card" style={{ width: '80vw', height: '80vh', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', position: 'absolute', overflowY: 'auto' }}>
        {filteredBooks.map((book) => (
          <li key={book._id} className="bg-gray-400 rounded-lg p-2 mb-2 animate-slide-left">
            <h2 className="font-semibold mb-2" style={{fontSize:'1.5vh'}}>{book.title}</h2>
            <p className="text-gray-700" style={{fontSize:'1.5vh'}}>{book.author}</p>
            <p className="text-gray-700 mt-2"style={{fontSize:'1.5vh'}}>{book.publishYear}</p>
            <a href={book.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-red-800 hover:underline" style={{fontSize:'1.5vh'}}>View PDF</a>
            <div className="mt-4 flex justify-between">
              <button onClick={() => handleEditClick(book._id)} className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded text-sm lg:text-lg">Edit</button>
              <button onClick={() => handleAddToFav(book._id)} className="hover:transition-all duration-300 ease-in-out  bg-yellow-500 hover:bg-gray-200 hover:text-gray-800 text-white font-bold py-2 px-4 rounded text-sm lg:text-lg">Add to Fav</button>
              <button onClick={() => handleDelete(book._id)} className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded text-sm  lg:text-lg">Delete</button>
            </div>
          </li>
        ))}
      </ul>
      {editBookId && <EditComponent bookId={editBookId}  onClose={handleEditComponentClose} />}
    </div>
  )
}

export default Home
