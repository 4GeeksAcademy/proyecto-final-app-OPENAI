import Sidebar from '../components/layout/Sidebar';

function MealPlan() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container my-5">
        <h2>Plan de Comidas</h2>
        <p>Organiza tus comidas semanales de forma sencilla.</p>
      </div>
    </div>
  );
}

export default MealPlan;