import PropTypes from 'prop-types';

function Navbar({ onRegisterClick }) {
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="#">Mama mIA</a>
      <button className="btn btn-success" onClick={onRegisterClick}>Empiece gratis</button>
    </nav>
  );
}

Navbar.propTypes = {
  onRegisterClick: PropTypes.func.isRequired,
};

export default Navbar;
  