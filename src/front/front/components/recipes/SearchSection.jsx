import PropTypes from 'prop-types';

function SearchSection({ onSearchClick }) {
  return (
    <div className="text-center my-5">
      <h1>Encuentra tu receta perfecta</h1>
      <p>Busca recetas personalizadas con nuestra IA</p>
      <div className="d-flex justify-content-center">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Ingresa un ingrediente o plato"
        />
        <button className="btn btn-success ms-2" onClick={onSearchClick}>Buscar</button>
      </div>
    </div>
  );
}

SearchSection.propTypes = {
  onSearchClick: PropTypes.func.isRequired,
};

export default SearchSection;
