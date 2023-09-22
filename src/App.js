import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom'
import Root from './components/pages/Root';


const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Root/>} />,
))

const App = () => {
  return (
    <RouterProvider router={router}/>
  )
};

export default App;
