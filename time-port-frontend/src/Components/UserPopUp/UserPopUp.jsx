import './UserPopUp.css';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../Context/UserContext';
import emptypfp from '../../assets/emptypfp.png';
import { addOrUpdateUser } from '../../api';

const UserProfilePopup = ({ onClose }) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [username, setUsername] = useState(currentUser.name || '');
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(currentUser.profile_photo || emptypfp);
  const [errorMsg, setErrorMsg] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    setErrorMsg('');
    try {
      const data = {
        username,
        profile_photo: selectedFile,
      };

      const response = await addOrUpdateUser(data, currentUser.id);

      if (response?.data?.payload) {
        setCurrentUser(response.data.payload);
        onClose();
      } else {
        setErrorMsg('Something went wrong. Try again.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to save. Please try again.');
    }
  };

  return (
    <div className="profile-popup-overlay">
      <div className="profile-popup">
        <h2>Edit Profile</h2>
        {errorMsg && <p className="error-msg">{errorMsg}</p>}

        <div className="profile-preview">
          <img src={preview} alt="Profile" className="profile-img" />
        </div>

        <div className="input-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Upload Profile Picture</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        <div className="button-group">
          <button onClick={handleSave}>Save</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePopup;
