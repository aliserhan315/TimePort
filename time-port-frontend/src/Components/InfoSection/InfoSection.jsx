import './InfoSection.css';
import pic1 from '../../assets/pic1.jpg';
import pic2 from '../../assets/pic2.png';
import pic3 from '../../assets/pic3.png';
import pic4 from '../../assets/pic4.jpg';

const InfoSection = () => {
  return (
    <section className="info-section">
      <div className="features">

        <div className="feature">
             <div className="feature-description">
          <h3>Save Memories Effortlessly</h3>
          <p>Upload photos, videos, letters, or voice notes. Your memories are safely stored and will stand the test of time.</p>
         </div>
          <img src={pic1} alt="Save Memories" className="image-left" />
        </div>

        <div className="feature">
          <div className="feature-description">
          <h3>Lock and Forget Until the Future</h3>
          <p>Upload photos, videos, letters, or voice notes. Your memories are safely stored and will stand the test of time.</p>
          </div>
           <img src={pic2} alt="Lock" className="image-right" />
        </div>

        <div className="feature">
             <div className="feature-description">
          <h3>Privacy is Our Priority</h3>
          <p>Upload photos, videos, letters, or voice notes. Your memories are safely stored and will stand the test of time.</p>
          </div>
          <img src={pic3} alt="Privacy" className="image-left" />
        </div>

        <div className="feature">
         <div className="feature-description">
          <h3>Post to Surprise Your Future Self</h3>
          <p>Write a message for your future self, or surprise a loved one years from now with a heartfelt capsule.</p>
          </div>
           <img src={pic4} alt="Surprise" className="image-right" />
        </div>

      </div>
    </section>
  );
};

export default InfoSection;
