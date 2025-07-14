
import './Footer.css';

import { FiChevronRight } from 'react-icons/fi';
import { FaTwitter } from 'react-icons/fa';
import { AiFillYoutube, AiFillInstagram } from 'react-icons/ai';
import { SiGithub } from "react-icons/si";


const Footer = ( {showbutton=''}) => {
  return (
    <footer className="footer">
      <div className="container">

     

        <div className="footer-main">
          <div className="footer-about">
            <div className="logo">
              <span>TimePort</span>
            </div>
            <p>
              Thank you for exploring the past and future with TimePort! We help you preserve meaningful memories, lock them in time, and revisit them when it matters most.
              Whether it's a message to your future self or a surprise for someone you love, your story lives on.
            </p>
            <div className="social-icons">
              <FaTwitter />
              <AiFillYoutube />
              <AiFillInstagram />
              <SiGithub />
            </div>
          </div>

          {showbutton && (<div className="footer-links">
            <div>
              <h4>Features</h4>
              <ul>
                <li><FiChevronRight className="icon" /> Secure Capsule</li>
                <li><FiChevronRight className="icon" /> Unlock Scheduler</li>
                <li><FiChevronRight className="icon" /> Media Uploads</li>
                <li><FiChevronRight className="icon" /> Encrypted Storage</li>
                <li><FiChevronRight className="icon" /> Notifications</li>
              </ul>
            </div>
            <div>
              <h4>Resources</h4>
              <ul>
                <li><FiChevronRight className="icon" /> Help Center</li>
                <li><FiChevronRight className="icon" /> Privacy Policy</li>
                <li><FiChevronRight className="icon" /> Terms</li>
                <li><FiChevronRight className="icon" /> Contact</li>
                <li><FiChevronRight className="icon" /> Feedback</li>
              </ul>
            </div>
          </div>)}
        </div>

        <div className="footer-bottom">
          <small>TIME CAPSULE PLATFORM</small><br />
          <small>By Ali Serhan</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
