import { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';

function AddRecipe() {
  const [recipe, setRecipe] = useState({ title: '', description: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleSubmit = () => {
    console.log('Receta añadida:', recipe);
    setRecipe({ title: '', description: '' });
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container my-5">
        <h2>Añadir Receta</h2>
        <input
          type="text"
          name="title"
          placeholder="Título de la receta"
          className="form-control mb-2"
          value={recipe.title}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Descripción de la receta"
          className="form-control mb-2"
          value={recipe.description}
          onChange={handleChange}
        ></textarea>
        <button className="btn btn-primary" onClick={handleSubmit}>Guardar Receta</button>
      </div>
    </div>
  );
}

export default AddRecipe;