import Sidebar from '../components/layout/Sidebar';
import RecipeCards from '../components/recipes/RecipeCards';

function Recipes() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container my-5">
        <h2>Recetas</h2>
        <RecipeCards />
      </div>
    </div>
  );
}

export default Recipes;

