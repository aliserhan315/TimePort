import './UserPopUp.css';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../Context/UserContext';
import emptypfp from '../../assets/emptypfp.png'

const UserProfilePopup = ({ onClose }) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [username, setUsername] = useState(currentUser.username);
  const [profilePic, setProfilePic] = useState(currentUser.profilePic || '');

  const handleSave = () => {
    const updatedUser = { ...currentUser, username, profilePic };
    setCurrentUser(updatedUser);
    onClose();
  };

  return (
    <div className="profile-popup-overlay">
      <div className="profile-popup">
        <h2>Edit Profile</h2>
        <div className="profile-preview">
          <img
            src={profilePic || emptypfp}
            alt="Profile"
            className="profile-img"
          />
        </div>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="profile-pic-upload">Upload Profile Picture</label>
          <input
            id="profile-pic-upload"
            type="file"
            accept="image/*"
            onChange={e => {
              const file = e.target.files[0];
              if (file) {
                setProfilePic(URL.createObjectURL(file));
              }
            }}
          />
        </div>
        <div className="button-group">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose} className="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePopup;
