import Footer from '../Components/Footer';

import React from 'react'
import {useNavigate } from "react-router-dom";
import Button from '../Components/Buttons';
import HeroSection from '../Components/HeroSection';


const Home = () => {
  const navigate = useNavigate();
  return (
  

    <div className="App">
      <HeroSection/>
        <Button buttonType='inverted' onClick={() => navigate('/capsulewall')}>Go to Capsule Wall</Button>    
         <Footer />
       </div>
   
  )
}

export default Home

