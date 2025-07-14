import Button from "../Buttons/Buttons";
import './HeroSection.css';
import savememories from '../../assets/Savememories.jpg';

const HeroSection = ({btnOnClick}) => {
  return (
    <section className="Hero-Section">
        <div className="Hero-section1">
            <div className="texts">
      <h1>TimePort Secure Protects Us</h1>
      <h2><span className="highlight">Memories</span> In Digital Time</h2>
      <p >
        TimePort is a digital time capsule that lets you save documents, photos, videos, messages, and more
        and revisit them anytime in the future. Secure and Timeless.
      </p>
      </div >
      
        <Button  className="hero-btn" onClick={btnOnClick} >Learn more</Button>   
        
      </div>
      <div className="Hero-pics">
      <img src={savememories} alt="Save Memories" className="hero-image" />
       <img src={savememories} alt="Save Memories" className="hero-image1" />
       </div>
    </section>
  );
}

export default HeroSection;
