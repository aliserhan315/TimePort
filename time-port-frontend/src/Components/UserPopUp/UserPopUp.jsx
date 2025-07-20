import './UserPopUp.css';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../Context/UserContext';
import emptypfp from '../../assets/emptypfp.png';
import { addOrUpdateUser } from '../../api';

const UserProfilePopup = ({ onClose }) => {
  const { currentUser, setCurrentUser, setAuthToken } = useContext(UserContext);
  const [username, setUsername] = useState(currentUser.name);
  const [profilePicPreview, setProfilePicPreview] = useState(currentUser.profile_photo || emptypfp);
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setProfilePicPreview(URL.createObjectURL(file));
    } else {
      setSelectedFile(null);
      setProfilePicPreview(currentUser.profile_photo || emptypfp);
    }
  };

  const handleSave = async () => {
    setErrorMsg('');
    try {
      const formData = new FormData();
      formData.append('username', username);
      if (selectedFile) {
        formData.append('profile_photo', selectedFile);
      }

      const response = await addOrUpdateUser(formData, currentUser.id);

      if (!response || !response.data || !response.data.payload) {
        console.error('Save error: Unexpected response structure.', response);
        setErrorMsg('Save failed: Invalid server response.');
        return;
      }

      const updatedUserFromBackend = response.data.payload;
      setCurrentUser(updatedUserFromBackend);
      setSelectedFile(null);

      if (updatedUserFromBackend.token) {
        setAuthToken(updatedUserFromBackend.token);
      }

      onClose();
    } catch (error) {
      console.error('Error saving profile:', error);
      let message = 'An unexpected error occurred while saving. Please try again.';

      if (error.response && error.response.data) {
        message = error.response.data.payload || message;
      }

      setErrorMsg(message);
    }
  };

  return (
    <div className="profile-popup-overlay">
      <div className="profile-popup">
        <h2>Edit Profile</h2>
        {errorMsg && <p className="error-msg">{errorMsg}</p>}
        <div className="profile-preview">
          <img
            src={profilePicPreview || emptypfp}
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
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="profile-pic-upload">Upload Profile Picture</label>
          <input
            id="profile-pic-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <div className="button-group">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose} className="cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePopup;