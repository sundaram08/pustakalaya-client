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
           <h1 className='' style={{position:'absolute',fontSize:'2.2vh',left:'2vw'}}>पुस्तकालय</h1>
           </Link> 
        </div>
        <div className='' style={{width:'50vw',height:'5vh',left:'20vw',top:'2vh',position:'absolute'}}>
        <input
              type="text"
              placeholder="Search..."
              onChange={handleSearch}
              className="text-black text-sm lg:text-base border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
              style={{width:"50vw",height:'5vh',position:'absolute'}}
            />
        </div>
        <div className='' style={{width:'15vw',height:'5vh',left:'80vw',top:'2vh',position:'absolute'}}>
          <div className='' style={{width:'7vw',height:'5vh',left:'',top:'',position:'absolute'}}>
            <Link to="/new">
            <h1 className='shadow-lg' style={{fontSize:'1.7vh',left:'2vw',position:'absolute'}}>Book+</h1>
            </Link>
          </div>
          <div className='' style={{width:'7vw',height:'5vh',left:'8vw',top:'',position:'absolute'}}>
            {token ? (
                <h1 className='' style={{fontSize:'1.7vh'}}>
                    <Link to="/logout">Logout</Link>
                </h1>
            ) : (
                <h1 className='' style={{fontSize:'1.7vh'}}>
                    <Link to="/signup">SignUp</Link>
                </h1>
            )}
          </div>    
        </div>
        <h1  onClick={() => handleCategoryClick('all')} className='underline cursor-pointer' style={{position:'absolute',left:'10vw',top:'10vh',width:'10vw',fontSize:'1.3vh'}}>
          All
        </h1>
        <h1 onClick={() => handleCategoryClick('Fiction')} className='underline cursor-pointer' style={{position:'absolute',left:'24vw',top:'10vh',width:'10vw',fontSize:'1.3vh'}}>
          Fiction
        </h1>
        <h1 onClick={() => handleCategoryClick('Biography')} className='underline cursor-pointer' style={{position:'absolute',left:'38vw',top:'10vh',width:'10vw',fontSize:'1.3vh'}}>
          Biography
        </h1>
        <h1 onClick={() => handleCategoryClick('History')} className='underline cursor-pointer'style={{position:'absolute',left:'52vw',top:'10vh',width:'10vw',fontSize:'1.3vh'}}>
          History
        </h1>
        <h1 onClick={() => handleCategoryClick('Drama')} className='underline cursor-pointer' style={{position:'absolute',left:'66vw',top:'10vh',width:'10vw',fontSize:'1.3vh'}}>
          Drama
        </h1> 
        <h1 onClick={() => handleCategoryClick('Economics')} className='underline cursor-pointer' style={{position:'absolute',left:'80vw',top:'10vh',width:'10vw',fontSize:'1.3vh'}}>
          Economics
        </h1>
    </header>
  );
}

export default Header;
