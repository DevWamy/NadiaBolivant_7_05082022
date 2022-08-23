//Je créé une fonction
const recipeCardsFactory = (recette) => {
    //Dans celle-ci, je créé une autre fonction avec avec des paramètres que je détermine.
    const getRecipeCardDOM = () => {
        // Je prends la div qui va contenir les vignettes.
        const recipeList = document.querySelector('#wrapper-recettes');

        // Je crée le bloc article des recettes.
        const articleRecipe = `
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

        // J'insere donc articleRecipe à l'intérieur de la liste de recette après la dernière affichée.
        recipeList.insertAdjacentHTML('beforeEnd', articleRecipe);
    };

    //Je joue la fonction de la carte (getRecipeCardDOM)
    getRecipeCardDOM();

    // Je boucle sur le tableau d'ingrédients pour les afficher 1 par 1.
    //Pour chaque ingrédient de la recette,
    recette.ingredients.forEach((ingredient) => {
        //Je créé une liste d'ingrédient en selectionnant l'ul qui listera les ingr (qui est construit dans articleRecipe).
        //Et j'ajoutela recette concernée(recette.id).
        let listeIngrédients = document.querySelector('#ingredients-' + recette.id);

        //Je créé 3 variable (1 pour chaque type).
        let varIngredient = ingredient.ingredient;
        let varQuantity = ingredient.quantity;
        let varUnit = ingredient.unit;
        //Ainsi, j'afficherai l'ingr, la quantité et l'unité pour la recette concernée).

        //Si la quantité n'est pas définie, (undefined) alors, on affichera: "vide".
        if (varQuantity == undefined) {
            varQuantity = '';
        }

        //Si l'unité est tout à fait similaire à undefined alors on affichera "vide".
        if (varUnit === undefined) {
            varUnit = '';
        }

        //Je créé une liste d'items et j'y intègre du HTML.
        //Une liste avec li, strong pour l'affichage en gras, l'ingr concerné par la recette ainsi que la quantité et l'unité.
        const listeItem = `
                <li><strong>${varIngredient} :</strong> ${varQuantity} ${varUnit}</li>
            `;
        //J'insère la liste des items à l'intérieur de la liste d'ingr après le dernier affiché.
        listeIngrédients.insertAdjacentHTML('beforeEnd', listeItem);
    });
};
