import { useEffect, useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import '../styles/Profile.css';

function Profile() {
  const [userData, setUserData] = useState({ name: '', email: '', profileImage: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({ name: '', email: '', profileImage: '' });

  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      setUserData(JSON.parse(storedData));
      setTempData(JSON.parse(storedData));
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setUserData(tempData);
    localStorage.setItem('userData', JSON.stringify(tempData));
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profileImage' && files.length > 0) {
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        setTempData({ ...tempData, profileImage: event.target.result });
      };
      fileReader.readAsDataURL(files[0]);
    } else {
      setTempData({ ...tempData, [name]: value });
    }
  };

  return (
    <div className="d-flex">
      <Sidebar onSidebarClick={() => {}} />
      <div className="profile-container container my-5">
        <div className="profile-header text-center">
          <img
            src={userData.profileImage || 'https://via.placeholder.com/100'}
            alt="Perfil"
            className="profile-img mb-3"
          />
          {isEditing && (
            <input
              type="file"
              name="profileImage"
              accept="image/*"
              className="form-control mb-2"
              onChange={handleChange}
            />
          )}
          {isEditing ? (
            <input
              type="text"
              name="name"
              className="form-control mb-2"
              value={tempData.name}
              onChange={handleChange}
            />
          ) : (
            <h2>{userData.name}</h2>
          )}
          {isEditing ? (
            <input
              type="email"
              name="email"
              className="form-control mb-2"
              value={tempData.email}
              onChange={handleChange}
            />
          ) : (
            <p className="text-muted">@{userData.email}</p>
          )}
        </div>
        <div className="profile-stats d-flex justify-content-around my-4">
          <div><strong>0</strong><br />Seguidores</div>
          <div><strong>0</strong><br />Siguiendo</div>
        </div>
        <div className="profile-actions text-center">
          {isEditing ? (
            <button className="btn btn-success me-2" onClick={handleSave}>Guardar</button>
          ) : (
            <button className="btn btn-outline-primary me-2" onClick={handleEdit}>Editar Perfil</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
