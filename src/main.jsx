import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import UserPage from './components/Home/UserPage.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import WebFont from 'webfontloader';
import Add from './components/Add/Add.jsx'
WebFont.load({
  google: {
    families: ['Roboto', 'Open Sans','Mathilga','San Francisco']
  }
});

const router = createBrowserRouter([{
  path: '/',
  element: <Layout/>,
  children:[
    { path: "",
      element: <Home/>
    },
    {
      path:"/new",
      element: <Add/>
    },
    {
      path:"/user",
      element:<UserPage/>
    },
    {}
  ]
}])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router = {router}/>
    </Provider>
  </React.StrictMode>,
)
