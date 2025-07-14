
import "./card.css";
import { FaLock, FaLockOpen } from "react-icons/fa";
import emptyPfp from '../../assets/emptypfp.png';
import { useEffect, useState } from "react";
import axios from "axios";

const Card = ({ Capsule }) => {
  const { name, ownerId, status, creationdate, activationdate, mood } = Capsule;
  const isActivated = new Date() >= new Date(activationdate);
  const today = new Date();
  const activation = new Date(activationdate);
  const remainingDays = Math.ceil((activation - today) / (1000 * 60 * 60 * 24));

  const [owner, setOwner] = useState(null);

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const res = await axios.get(`/data/users.json`);
   
        const foundUser = res.data.find(
          user => user.id === ownerId || user._id === ownerId
        );
        setOwner(foundUser);
      } catch (err) {
        console.error("Failed to fetch owner:", err);
      }
    };

    fetchOwner();
  }, [ownerId]);

  const ownername = owner?.username || "Unknown User";
  const ownerpfp = owner?.profilePic || emptyPfp;

  return (
    <div className="cardcontainer">
      <div className="card-head">
        <h5 className="card-title">{name}</h5>
        {isActivated ? (
          <FaLockOpen className="card-icon-open" />
        ) : (
          <FaLock className="card-icon-close" />
        )}
      </div>
      <div className="card-body">
        <div className="card-owner">
          <img src={ownerpfp} alt="User profile" className="user-avatar" />
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
            : `Remaining Duration: ${remainingDays} day${remainingDays !== 1 ? "s" : ""}`}
        </h5>
      </div>
    </div>
  );
};

export default Card;