import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div>
      <header className="shadow-md  bg-gray-300" style={{height:'17vh',width:'100vw',position:'relative'}}>
        <nav className="flex justify-between items-center border border-green-600" style={{position:'relative'}}>
          <Link to="/" className="font-Mathilga text-gray-800 sm:text-xl lg:text-2xl underline" style={{ fontFamily: 'Mathilga', fontWeight: '400',position:"absolute",top:'3vh',left:'4vh',width:'5vw' }}>
            BookStore
          </Link>
          <input
              type="text"
              placeholder="Search..."
              className="text-black text-sm lg:text-base border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
              style={{width:"45vw",left:'20vw',top:'3vh',height:'5vh',position:'absolute'}}
            />
          <div className="flex space-x-4">
            <Link to="/new" className="text-black sm:text-sm md:text-md lg:text-l" style={{ width: '5vw', height: '5vh', top: '3vh', fontFamily: 'SF Pro', fontWeight: '500', left: '80vw',position:'absolute'}}>
              NewBook
            </Link>
            <Link to="/user" className="text-black  sm:text-sm lg:text-l "style={{ width: '5vw', height: '5vh', top: '3vh', fontFamily: 'SF Pro', fontWeight: '500', left: '85vw',position:'absolute' }}>
              User
            </Link>
          </div>
        </nav>
        <div className='border' style={{top:'75%',left:'27vw',position:'relative',height:'4vh',width:'30vw'}}>
            <div className='border' style={{position:'absolute',width:'33.33%',height:'100%'}}>
                    <h1 style={{left:'1vh',position:'absolute'}}>
                        Best Sellers
                    </h1>
            </div>
            <div className='border' style={{position:'absolute',width:'33.33%',height:'100%',left:'33.33%'}}>
            <h1 style={{left:'1vh',position:'absolute'}}>
                        Fiction
                    </h1>
            </div>
            <div className='border' style={{position:'absolute',width:'33.33%',height:'100%',left:'66.67%'}}>
            <h1 style={{left:'1vh',position:'absolute'}}>
                        Biography
                    </h1>
            </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
