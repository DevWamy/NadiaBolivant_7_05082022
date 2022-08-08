//Fonction pour afficher par défaut les recettes.
const displayRecipes = (recipes) => {
    document.getElementById('wrapper-recettes').innerHTML = '';
    recipes.forEach((recipe) => {
        recipeCardsFactory(recipe);
    });
};
