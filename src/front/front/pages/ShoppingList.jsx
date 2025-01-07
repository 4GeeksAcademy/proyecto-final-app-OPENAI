import Sidebar from '../components/layout/Sidebar';

function ShoppingList() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container my-5">
        <h2>Lista de la Compra</h2>
        <p>Administra tu lista de compras de manera eficiente.</p>
      </div>
    </div>
  );
}

export default ShoppingList;
