import './UserPopUp.css';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../Context/UserContext';
import emptypfp from '../../assets/emptypfp.png';
import { addOrUpdateUser } from '../../api';

const UserProfilePopup = ({ onClose }) => {
  const BaseURL='http://localhost:8000';
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
    let base64Image = null;

    if (selectedFile) {
      base64Image = await convertToBase64(selectedFile);
    }

    const payload = {
      username,
      profile_photo: base64Image, 
    };
    console.log(payload)

    const response = await addOrUpdateUser(payload, currentUser.id);

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

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};


  return (
    <div className="profile-popup-overlay">
      <div className="profile-popup">
        <h2>Edit Profile</h2>
        {errorMsg && <p className="error-msg">{errorMsg}</p>}

        <div className="profile-preview">
         <img src={currentUser.profile_photo? `${BaseURL}${currentUser.profile_photo}` : emptypfp} alt="Profile" className="profile-img" />

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
