import "./card.css";
import { FaLock, FaLockOpen } from "react-icons/fa";
import emptyPfp from '../../assets/emptypfp.png';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ capsule, owner }) => {
  const navigate = useNavigate();
  const { name, status, created_at, activation_date, mood } = capsule;
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const now = currentTime;
  const activation = new Date(activation_date);
  const isActivated = now >= activation;
  const timeDiffMs = activation - now;
  const remainingDays = Math.ceil(timeDiffMs / (1000 * 60 * 60 * 24));

  let remainingTimeText = '';
  if (isActivated) {
    remainingTimeText = 'Already Activated';
  } else {
    if (remainingDays > 1) {
      remainingTimeText = `Remaining Duration: ${remainingDays} day${remainingDays !== 1 ? 's' : ''}`;
    } else {
      const hours = Math.floor((timeDiffMs / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeDiffMs / (1000 * 60)) % 60);
      const seconds = Math.floor((timeDiffMs / 1000) % 60);
      remainingTimeText = `Remaining: ${hours}h ${minutes}m ${seconds}s`;
    }
  }
    const BaseURL='http://localhost:8000';
    

  const ownername = owner?.name || 'Unknown User';
  const ownerpfp =  owner.profile_photo?  `${BaseURL}${owner?.profile_photo}` : emptyPfp;

  return (
    <div className="cardcontainer" onClick={() => navigate(`/capsule/${capsule.id}`) }>
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
        <p className="card-text">Status: {status ? "Public" : "Private"}</p>
        <p className="card-text">Creation Date: {new Date(created_at).toLocaleDateString()}</p>
        <p className="card-text">Activation Date: {activation.toLocaleDateString()}</p>
        <p className="card-text">Mood: {mood}</p>
      </div>
      <div className="card-footer">
        <h5 className="card-footer-text">{remainingTimeText}</h5>
      </div>
    </div>
  );
};

export default Card;
