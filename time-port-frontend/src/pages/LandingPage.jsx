import Footer from '../Components/Footer/Footer';
import HeroSection from '../Components/HeroSection/HeroSection';
import InfoSection from '../Components/InfoSection/InfoSection';
import SignUpBar from '../Components/SignUpBar/SignUpBar';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
   const infoRef = useRef(null);

 const handleScrollToInfo = () => {
    infoRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const nav=useNavigate()
    const handleSignUpClick = (email) => {
    nav('/signup', { state: { prefilledEmail: email } });
    }
 
  return (
  

    <div className="App">
      <HeroSection btnOnClick={handleScrollToInfo}/>
      <div ref={infoRef} className="info-section-container">
        
      <InfoSection />
      </div>
       <SignUpBar onClickHandler={handleSignUpClick}/>
         <Footer  showbutton='true'/>

       </div>
   
  )
}

export default LandingPage

