import React from 'react'
import { useDispatch } from 'react-redux'
import { clearToken } from '../../features/bookSlice'

const LogOut = () => {
    const dispatch = useDispatch()
   const handleLogout = ()=>{
        dispatch(clearToken())
   } 
  return (
    <div className='bg-gray-300'  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <button
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
        }}
        type="button"
        onClick={handleLogout}
      >
        Log Out
      </button>
    </div>
  )
}

export default LogOut
