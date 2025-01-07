import Sidebar from '../components/layout/Sidebar';

function Tags() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container my-5">
        <h2>Etiquetas</h2>
        <p>Aquí puedes gestionar y explorar etiquetas para tus recetas.</p>
        <ul className="list-group">
          <li className="list-group-item">Desayuno</li>
          <li className="list-group-item">Almuerzo</li>
          <li className="list-group-item">Cena</li>
          <li className="list-group-item">Postres</li>
        </ul>
      </div>
    </div>
  );
}

export default Tags;