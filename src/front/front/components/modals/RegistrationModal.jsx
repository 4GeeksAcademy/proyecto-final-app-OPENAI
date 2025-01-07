import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function RegistrationModal({ show, onClose }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', remember: false });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.password) {
      localStorage.setItem('userData', JSON.stringify(formData));
      onClose();
      navigate('/profile');
    }
  };

  if (!show) return null;

  return (
    <div className="modal d-block bg-dark bg-opacity-50">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Registro</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              className="form-control mb-2"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Correo"
              className="form-control mb-2"
              value={formData.email}
              onChange={handleChange}
            />
            <div className="input-group mb-2">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Contraseña"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
            <div className="form-check mb-2">
              <input
                type="checkbox"
                name="remember"
                className="form-check-input"
                checked={formData.remember}
                onChange={handleChange}
              />
              <label className="form-check-label">Recordar contraseña</label>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-primary" onClick={handleSubmit}>Registrar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

RegistrationModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RegistrationModal;
