import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate ,useLocation} from "react-router-dom";
import "../Styles/ViewCapsule.css";
import { getCapsuleById, addOrUpdateFile, deleteFile, deleteCapsule, getCapsuleFiles,} from "../api";
import { UserContext } from "../Context/UserContext";


const ViewCapsule = () => {
  const location = useLocation();

  const BaseURL = process.env.REACT_APP_BASE_URL;
  const { id } = useParams();
  const navigate = useNavigate();
  const [capsule, setCapsule] = useState(null);
  const [files, setFiles] = useState([]);
  const { currentUser } = useContext(UserContext);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  };

  const handleBack = () => {
  const from = location.state?.from;

  if (from === 'createcapsule') {
    navigate('/userpage');
  } else {
    navigate(-1);
  }
};
  useEffect(() => {
    async function fetchCapsuleAndFiles() {
      try {
        const capsuleRes = await getCapsuleById(id);
        setCapsule(capsuleRes.data.payload);

        const filesRes = await getCapsuleFiles(id);
        setFiles(filesRes.data.payload);
      } catch (error) {
        console.error("Failed to fetch capsule or files:", error);
      }
    }

    fetchCapsuleAndFiles();
  }, [id]);

  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    const newFiles = [];

    for (const file of selectedFiles) {
      const base64 = await convertToBase64(file);
      const res = await addOrUpdateFile({
        capsule_id: id,
        file: base64,
      });
      newFiles.push(res.data.payload);
    }

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDeleteFile = async (fileId) => {
    try {
      await deleteFile(fileId);
      setFiles((prev) => prev.filter((f) => f.id !== fileId));
    } catch (error) {
      console.error("Failed to delete file:", error);
    }
  };

  const handleDeleteCapsule = async () => {
    try {
      await deleteCapsule(id);
      navigate(-1);
    } catch (error) {
      console.error("Failed to delete capsule:", error);
    }
  };

  if (!capsule) return <div className="view-capsule-container">Loading...</div>;

  const isOwner = currentUser?.id === capsule.user_id;

  return (
    <div className="view-capsule-container">
      <div className="view-capsule-header">
        <div className="veiwcapsule-head">
          <h1>{capsule.name}</h1>
          <button type="button" className="back-button-view" onClick={handleBack}>
            ← Back
          </button>
        </div>
        <p><strong>Mood:</strong> {capsule.mood}</p>
        <p><strong>Message:</strong> {capsule.message}</p>
        {isOwner && (
          <button className="delete-capsule-btn" onClick={handleDeleteCapsule}>
            Delete Capsule
          </button>
        )}
      </div>

      {isOwner && (
        <div className="file-upload-section">
          <label>
            Add File:
            <input type="file" multiple onChange={handleFileChange} />
          </label>
        </div>
      )}

      <div className="uploaded-files">
        <h3>Uploaded Files</h3>
        <div className="file-grid">
          {files.map((file) => {
            const fileUrl = `${BaseURL}/storage/${file.file_path}`;

            return (
              <div key={file.id} className="file-item">
                {file.file_type?.startsWith("image") ? (
                  <img src={fileUrl} alt={file.file_name} className="preview-img" />
                ) : file.file_type?.startsWith("audio") ? (
                  <audio controls>
                    <source src={fileUrl} type={file.file_type} />
                    Your browser does not support the audio element.
                  </audio>
                  
                ) :file.file_type?.startsWith("video") ? (
                  <video controls>
                    <source src={fileUrl} type={file.file_type} />
                    Your browser does not support the video element.
                  </video>
                ):(
                  <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                    {file.file_name}
                  </a>
                )}
                {isOwner && (
                  <button className="delete-btn" onClick={() => handleDeleteFile(file.id)}>
                    🗑
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ViewCapsule;
