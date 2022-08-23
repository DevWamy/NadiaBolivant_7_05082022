const searchInput = () => {
    // Je récupere le champ de recherche.
    let searchinput = document.querySelector('#searchinput');

    // Je récupère sa valeur quand on entre des lettres dans l'input,
    searchinput.addEventListener('input', () => {
        //et je met tout en miniscule.
        const inputContent = normalizeString(searchinput.value);

        // Si le champ de recherche contient + de 2 caracteres,
        if (inputContent.length > 2) {
            // je filtre par item.
            currentRecipes = recipes.filter((item) => {
                // Si dans nom, description, ou ingredient je trouve ce qui à été tapé je retourne item.
                if (
                    normalizeString(item.name).includes(inputContent) ||
                    normalizeString(item.description).includes(inputContent) ||
                    item.ingredients.find((element) => {
                        return normalizeString(element.ingredient).includes(inputContent);
                    }) != undefined
                ) {
                    return item;
                }
            });

            // Je supprime les articles affichés avant de reboucler dessus et refaire un affichage filtré.
            document.querySelectorAll('.article-recette').forEach((element) => {
                element.remove();
            });

            // Je parcours les recettes filtrées.
            generateCards(currentRecipes);

            displayDropdownItems(currentRecipes, 'ingredients', tagFiltered);

            displayDropdownItems(currentRecipes, 'appareils', tagFiltered);

            displayDropdownItems(currentRecipes, 'ustensiles', tagFiltered);

            //Si il y a deux caratère ou moins,
        } else if (inputContent.length <= 2) {
            //J'affiche toutes les recettes.
            displayRecipes(recipes);
        }

        // Si il n'y a aucune recette trouvée j'affiche le message d'erreur.
        else {
            //Je retire la classe "hide" à la section de classe "no-recipes"
            document.querySelector('.no-recipes').classList.remove('hide');
        }
    });
};
