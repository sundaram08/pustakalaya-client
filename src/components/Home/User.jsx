import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearToken } from '../../features/bookSlice'
import { clearUserId } from '../../features/bookSlice'
import { useNavigate } from 'react-router-dom'

const User = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userId = useSelector((state)=> state.book.user_id)
    const [favBooks,setFavBooks] = useState([])
   const handleLogout = ()=>{
        console.log('oye');
        dispatch(clearToken())
        dispatch(clearUserId())
        navigate('/signup')
   }
   const fetchData = async () => {
    try {
      const response = await fetch(`https://pustakalaya-api.vercel.app/books/user/${userId}`)
      const data = await response.json();
      setFavBooks(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);  

  const handleRemove = async (id)=>{
    const userID = localStorage.getItem('userID')
        try {
          const response = await fetch(`https://pustakalaya-api.vercel.app/books/user/fav/${userID}/${id}`,{
              method: 'DELETE'
          });
          if (response.ok) {
            alert(`Book removed successfully.`);
            fetchData();
        } else {
          const errorMessage = await response.text();
          throw new Error(errorMessage || 'Failed to remove book');
        }
        } catch (error) {
          console.error('Error deleting book:', error);
          alert('An error occurred while deleting the book');
        }
  }

  return (
    <div className='bg-gray-300 min-h-screen flex flex-col items-center justify-between relative'>
    <h1 className="text-3xl font-semibold underline mt-8 mb-4">Your favourite books</h1>

    <ul className="w-10/12 max-w-lg flex-1 overflow-y-auto mb-8">
        {favBooks && favBooks.map((book) => (
            <li key={book._id} className="bg-gray-400 rounded-lg p-2 mb-2 animate-slide-right">
                <h2 className="font-semibold mb-2 text-l">{book.title}</h2>
                <p className="text-gray-700 text-base">{book.author}</p>
                <p className="text-gray-700 mt-2 text-base">{book.publishYear}</p>
               <a href={book.pdfUrl} className='text-red-800 text-sm'>View PDF</a>
                <div className="mt-4 flex justify-between">             
                    <button onClick={() => handleRemove(book._id)} className="border border-black
                     text-gray-300 shadow font-bold py-2 px-4 rounded">Remove</button>
                </div>
            </li>
        ))}
    </ul>

    <button
        className="absolute  top-0 right-0 m-4 px-4 py-2 bg-blue-500 text-white rounded-lg transition duration-300 ease-in-out hover:bg-blue-600"
        type="button"
        onClick={handleLogout}
    >
        Log Out
    </button>
</div>

  )
}

export default User
