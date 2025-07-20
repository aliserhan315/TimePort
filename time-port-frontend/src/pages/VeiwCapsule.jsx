import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import "../Styles/ViewCapsule.css";
import { getCapsuleById, addOrUpdateFile } from "../api";
import { UserContext } from "../Context/UserContext";

const ViewCapsule = () => {
  const { id } = useParams();
  const [capsule, setCapsule] = useState(null);
  const [files, setFiles] = useState([]);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    async function fetchCapsule() {
      try {
        const res = await getCapsuleById(id);
        const capsuleData = res.data.payload;
        setCapsule(capsuleData);
        setFiles(capsuleData.files || []);
      } catch (error) {
        console.error("Failed to fetch capsule:", error);
      }
    }
    fetchCapsule();
  }, [id]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("capsule_id", id);
    formData.append("file_name", file.name);
    formData.append("file_type", file.type);
    formData.append("file", file);

    try {
      const res = await addOrUpdateFile(formData);
      setFiles((prev) => [...prev, res.data.payload]); // Assumes backend returns uploaded file
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  if (!capsule) return <div className="view-capsule-container">Loading...</div>;

  const isOwner = currentUser?.id === capsule.user_id;

  return (
    <div className="view-capsule-container">
      <div className="view-capsule-header">
        <h1>{capsule.name}</h1>
        <p><strong>Mood:</strong> {capsule.mood}</p>
        <p><strong>Message:</strong> {capsule.message}</p>
      </div>

      {isOwner && (
        <div className="file-upload-section">
          <label>
            Add File:
            <input type="file" onChange={handleFileChange} />
          </label>
        </div>
      )}

      <div className="uploaded-files">
        <h3>Uploaded Files</h3>
        <div className="file-grid">
          {files.map((file, i) => (
            <div key={i} className="file-item">
              {file.file_type.startsWith("image") ? (
                <img src={file.url} alt={file.file_name} />
              ) : file.file_type.startsWith("audio") ? (
                <audio controls>
                  <source src={file.url} type={file.file_type} />
                  Your browser does not support the audio element.
                </audio>
              ) : (
                <p>{file.file_name}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewCapsule;
