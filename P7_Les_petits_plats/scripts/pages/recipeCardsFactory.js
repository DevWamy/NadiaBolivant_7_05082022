function recipeCardsFactory(recette) {
    function getRecipeCardDOM() {
        // Je prends la div qui va contenir les vignettes.
        const recipeList = document.querySelector('#wrapper-recettes');

        // Je crée le bloc article des recettes.
        const articleRecipie = `
            <article class="col-xl-4 col-md-6 py-4 px-0 article-recette id="cardRecipe">

                <div class="card">

                    <div class="background"></div>

                        <div class="row descriptif p-3 ">

                            <h5 class="col-md-7 titre mb-2 d-flex align-items-center">${recette.name}</h5>

                            <div class="col-md-5 time mb-3 d-flex align-items-center justify-content-end">
                                <i class="bi bi-clock"></i> &nbsp;
                                ${recette.time} min
                            </div>

                            <ul class="col-md-6 liste mb-3 " id="ingredients-${recette.id}">

                            </ul>

                            <p class="col-md-6 texte">${recette.description.substring(0, 170) + '...'}</p>

                            <p class="col-md-12 texte d-none">Appareil recommandé ${recette.appliance}</p>
                            <p class="col-md-12 texte d-none">Ustensile recommandé ${recette.ustensils}</p>

                        </div>
                    </div>

            </article>`;

        // J'insere les blocs tant qu'il y en a l'un après l'autre.
        recipeList.insertAdjacentHTML('beforeEnd', articleRecipie);
    }

    getRecipeCardDOM();

    // Je boucle sur le tableau d'ingrédients pour les afficher 1 par 1.
    recette.ingredients.forEach((ingredient) => {
        let listeIngrédients = document.querySelector('#ingredients-' + recette.id);

        let varIngredient = ingredient.ingredient;
        let varQuantity = ingredient.quantity;
        let varUnit = ingredient.unit;

        if (varQuantity == undefined) {
            varQuantity = '';
        }

        if (varUnit === undefined) {
            varUnit = '';
        }

        const listeItem = `
                <li><strong>${varIngredient} :</strong> ${varQuantity} ${varUnit}</li>
            `;

        listeIngrédients.insertAdjacentHTML('beforeEnd', listeItem);
    });
}
