import './App.css'
import Header from './Header'
import Footer from './Footer'
import React, { useState } from "react";
import SearchPoke from './SearchPoke';
import FilterRegion from './FilterRegion';


function App() {
  return (
    <>
    <Header/>
    <SearchPoke/>
    <FilterRegion/>
    <Footer/>
    </>
  )
};

export default App