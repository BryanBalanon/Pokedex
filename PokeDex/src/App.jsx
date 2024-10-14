import './App.css'
import Header from './Header'
import Footer from './Footer'
import React, { useState } from "react";
import SearchPoke from './SearchPoke';


function App() {
  return (
    <>
    <Header/>
    <SearchPoke/>
    <Footer/>
    </>
  )
};

export default App