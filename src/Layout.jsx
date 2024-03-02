import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
function Layout() {
  return (
    <div style={{}}>
      <Header />
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Layout
