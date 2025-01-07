function RecipeCards() {
    const recipes = [
      { id: 1, title: 'Pizza Margarita', image: 'https://via.placeholder.com/250' },
      { id: 2, title: 'Ensalada César', image: 'https://via.placeholder.com/250' },
      { id: 3, title: 'Tacos al Pastor', image: 'https://via.placeholder.com/250' },
      { id: 4, title: 'Sushi Variado', image: 'https://via.placeholder.com/250' },
    ];
  
    return (
      <div className="row mb-5">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="col-md-3 mb-4">
            <div className="card">
              <img src={recipe.image} alt={recipe.title} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <a href={`/recipes/${recipe.id}`} className="btn btn-primary">Ver Receta</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  export default RecipeCards;