import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import '../../styles/Sidebar.css';

function Sidebar({ onSidebarClick }) {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    if (onSidebarClick) {
      onSidebarClick(path);
    }
  };

  return (
    <div className="sidebar d-flex flex-column bg-light vh-100 p-4 shadow-sm">
      <h4 className="mb-4 text-center fw-bold">Mr. Cook</h4>
      <ul className="nav flex-column">
        <li className="nav-item" onClick={() => handleNavigation('/recipes')}>
          <i className="bi bi-book me-2"></i>Recetas
        </li>
        <li className="nav-item" onClick={() => handleNavigation('/shopping-list')}>
          <i className="bi bi-cart me-2"></i>Lista de la compra
        </li>
        <li className="nav-item" onClick={() => handleNavigation('/meal-plan')}>
          <i className="bi bi-calendar me-2"></i>Plan de comidas
        </li>
        <li className="nav-item" onClick={() => handleNavigation('/tags')}>
          <i className="bi bi-tags me-2"></i>Etiquetas
        </li>
        <li className="nav-item" onClick={() => handleNavigation('/profile')}>
          <i className="bi bi-person me-2"></i>Perfil
        </li>
        <li className="nav-item" onClick={() => handleNavigation('/add-recipe')}>
          <i className="bi bi-plus-circle me-2"></i>Añadir receta
        </li>
      </ul>
    </div>
  );
}

Sidebar.propTypes = {
  onSidebarClick: PropTypes.func,
};

export default Sidebar;
