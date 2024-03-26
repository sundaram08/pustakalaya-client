import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchBooks, setCategory } from '../../features/bookSlice';



function Header() {
  const dispatch  = useDispatch();
  const token = useSelector((state) => state.book.token);
  const handleSearch = (e) => {
    e.preventDefault();
  
    dispatch(searchBooks(e.target.value))
  };
  const handleCategoryClick = (category) => {
    dispatch(setCategory(category));
  };
  return (
    <header className=' shadow-md bg-gray-300' style={{width:'100vw',height:'14vh',position:'relative'}}>
        <div className='' style={{width:'10vw',height:'5vh',top:'2vh',left:'3vw',position:'absolute'}}>
           <Link to="/" >
           <h1 className='text-sm md:text-xl lg:text-3xl' style={{position:'absolute',left:'2vw'}}>पुस्तकालय</h1>
           </Link> 
        </div>
        <div className='w-30% lg:w-50%' style={{height:'5vh',left:'23vw',top:'2vh',position:'absolute'}}>
        <input
              type="text"
              placeholder="Search..."
              onChange={handleSearch}
              className="text-black text-sm lg:text-base border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
              style={{width:"50vw",height:'5vh',position:'absolute'}}
            />
        </div>
        <div className='' style={{width:'15vw',height:'5vh',left:'76vw',top:'2vh',position:'absolute'}}>
          <div className='' style={{width:'7vw',height:'5vh',left:'',top:'',position:'absolute'}}>
            <Link to="/new">
            <h1 className='shadow-lg text-xs md:text-sm lg:text-xl' style={{left:'1vw',position:'absolute'}}>Book+</h1>
            </Link>
          </div>
          <div className='' style={{width:'7vw',height:'5vh',left:'8vw',top:'',position:'absolute'}}>
            {token ? (
                <Link to="/user">
                <h1 className='text-xs md:text-sm lg:text-xl ml-4' style={{}}>
                  User
                </h1>
                </Link>
            ) : (
               <Link  to="/signup">
                <h1 className='text-sm lg:text-xl ml-6' style={{}}>
                    SignUp
                </h1>
                </Link>
            )}
          </div>    
        </div>
        <h1   onClick={() => handleCategoryClick('all')} className=' hover:text-gray-500  custom-text md:text-sm lg:text-base ml-2  underline cursor-pointer' style={{position:'absolute',left:'10vw',top:'10vh',width:'10vw'}}>
          All
        </h1>
        <h1  onClick={() => handleCategoryClick('Fiction')} className=' hover:text-gray-500 custom-text  md:text-sm lg:text-base ml-2  underline cursor-pointer' style={{position:'absolute',left:'24vw',top:'10vh',width:'10vw'}}>
          Fiction
        </h1>
        <h1  onClick={() => handleCategoryClick('Biography')} className=' hover:text-gray-500 custom-text  md:text-sm lg:text-base ml-2  underline cursor-pointer' style={{position:'absolute',left:'38vw',top:'10vh',width:'10vw'}}>
          Biography
        </h1>
        <h1  onClick={() => handleCategoryClick('History')} className=' hover:text-gray-500 custom-text  md:text-sm lg:text-base ml-4  underline cursor-pointer'style={{position:'absolute',left:'52vw',top:'10vh',width:'10vw'}}>
          History
        </h1>
        <h1  onClick={() => handleCategoryClick('Drama')} className=' hover:text-gray-500 custom-text  md:text-sm lg:text-base ml-2  underline cursor-pointer' style={{position:'absolute',left:'66vw',top:'10vh',width:'10vw'}}>
          Drama
        </h1> 
        <h1  onClick={() => handleCategoryClick('Economics')} className=' hover:text-gray-500 custom-text md:text-sm lg:text-base ml-2  underline cursor-pointer' style={{position:'absolute',left:'80vw',top:'10vh',width:'10vw'}}>
          Economics
        </h1>
    </header>
  );
}

export default Header;
