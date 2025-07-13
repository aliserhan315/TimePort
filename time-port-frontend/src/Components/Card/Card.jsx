import "./card.css"
import { FaLock,FaLockOpen  } from "react-icons/fa";
import emptyPfp from '../../assets/emptypfp.png';
const Card = ({ Capsule }) => {
    const { name, ownername ,ownerpfp,status,creationdate,activationdate,mood} = Capsule;
     const isActivated = new Date() >= new Date(activationdate);
     const today = new Date();
    const activation = new Date(activationdate); 
    const remainingDays = Math.ceil((activation - today) / (1000 * 60 * 60 * 24));

    return (
      <div className='cardcontainer'>
        <div className="card-head">
          <h5 className="card-title">{name}</h5>
          {isActivated ? (
            <FaLockOpen className="card-icon-open" />) : (
            <FaLock className="card-icon-close" />)}
        </div>
        <div className="card-body">
          <div className="card-owner">
            <img src={ownerpfp || emptyPfp} alt="User profile" className="user-avatar" />
          
          <span className="username">{ownername}</span>
          </div>
          <p className="card-text">Status: {status}</p>
          <p className="card-text">Creation Date: {new Date(creationdate).toLocaleDateString()}</p>
          <p className="card-text">Activation Date: {new Date(activationdate).toLocaleDateString()}</p>
          <p className="card-text">Mood: {mood}</p>

       
          </div>
      <div className="card-footer">
  <h5 className="card-footer-text">
      {isActivated
        ? "Already Activated"
        : `Remaining Duration: ${remainingDays} day${remainingDays !== 1 ? 's' : ''}`}
      </h5>
    </div>
      </div>
    );
  };

export default Card