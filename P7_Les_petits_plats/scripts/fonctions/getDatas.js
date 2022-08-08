//Fonction pour afficher par défaut les recettes.
const displayRecipes = (recipes) => {
    document.getElementById('wrapper-recettes').innerHTML = '';
    recipes.forEach((recipe) => {
        recipeCardsFactory(recipe);
    });
};

// Boucle sur les données.
async function init() {
    // Affichage par défaut de toutes les recettes au chargement de la page.
    displayRecipes(recipes);
}

init();

// Appel de la boucle pour les cards de recette.
function generateCards(recettes) {
    // Je parcours les recettes.
    recettes.forEach((recette) => {
        recipeCardsFactory(recette);
    });
}
