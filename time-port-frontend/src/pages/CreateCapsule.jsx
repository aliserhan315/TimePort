import React, { useState } from "react";
import "../Styles/CreateCapsule.css";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import {addOrUpdateCapsule,addOrUpdateFile} from "../api"
import { useNavigate } from "react-router-dom";

  import Button from "../Components/Buttons/Buttons";

const CreateCapsule = () => {

  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [mood, setMood] = useState("");
  const [message, setMessage] = useState("");
  const [surprise, setSurprise] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [releaseDate, setReleaseDate] = useState("");
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles([...files, ...Array.from(e.target.files)]);
  };
  const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
};

  const handleRemoveFile = (index) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   const capsuleData = {
    name: title,
    user_id:currentUser.id,
    mood: mood,
    message:message,
    is_surprise:surprise,
    is_public: isPublic,
    release_date: releaseDate,
  };
  
  
    try {
    const res = await addOrUpdateCapsule(capsuleData);
    const capsuleId = res.data.payload.id;

    for (const file of files) {
      const base64 = await convertToBase64(file);
      await addOrUpdateFile({
        capsule_id: capsuleId,
        file: base64,
      });
    }

    navigate(`/capsule/${capsuleId}`, {state: { from: 'createcapsule'}
});
  } catch (error) {
    console.error("Error creating capsule or uploading files:", error);
  }
};
    
  return (
    <div>
       <div className="Create-form-header">
        <h1>TimePort</h1>
        <button type="button" className="back-button" onClick={() => window.history.back()}>← Back</button>
      </div>
    <form className="capsulecreate-form" onSubmit={handleSubmit}>
     

      <div className="form-group-row">
        <input className="title-input" placeholder="capsule title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input className="title-input" placeholder="Mood" value={mood} onChange={(e) => setMood(e.target.value)} />
      </div>

      <textarea className="create-textarea"
        placeholder="Write a message to your future self"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <div className="Create-form-options">
        <div className="form-option">
        <label>
          <div>
          <input className="create-input" type="checkbox" checked={surprise} onChange={() => setSurprise(!surprise)} />
          Surprise me
          </div>
          <p  className=" warning-message">if you click this you wont be able to veiw this till its release date</p>
        </label>
        </div>
        <div className="form-option">
        <label>
          Release Date:
          <input type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} />
        </label>
            </div>
            <div className="form-option">
        <label>
          <div>
          <input   className="create-input" type="checkbox" checked={isPublic} onChange={() => setIsPublic(!isPublic)} />
          Public
          </div>
          <p className=" warning-message">if you click this you capsule will be on the Public wall when revealed </p>
        </label>
        </div>
      </div>

      <div className="create-file-upload">
        <label className="reversedlable">
             <div className="add-file-container">
            <p className="add-file-tag">Add Files </p> 
             </div>
               <input 
                type="file" 
                multiple 
                hidden 
                onChange={handleFileChange} 
              />
             
            </label>
            

        <div className="file-list">
          {files.map((file, index) => (
            <div key={index} className="file-item">
              {file.name}
              <Button type="button" onClick={() => handleRemoveFile(index)}>🗑</Button>
            </div>
          ))}
        </div>
      </div>
      <Button className="base button" type="submit">Create Capsule</Button>

  
    </form>
    </div>
  );
};

export default CreateCapsule;
