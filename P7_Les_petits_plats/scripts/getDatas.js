//Fonction pour afficher par défaut les recettes.
//Je créé une variable qui affiche les recettes à l'écran.
const displayRecipes = (recipes) => {
    //Je les affiche dans wrapper-recettes.
    document.getElementById('wrapper-recettes').innerHTML = '';
    //Pour chaque recette, je joue la carte recette (qui permet d'afficher avec les bons paramètres).
    recipes.forEach((recipe) => {
        recipeCardsFactory(recipe);
    });
};
