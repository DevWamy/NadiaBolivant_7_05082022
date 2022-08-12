// Je selectionne les dropdowns qui afficherons les elements filtrables.
let dropIngredients = document.querySelector('#ingredients');
let dropUstensiles = document.querySelector('#ustensiles');
let dropAppareils = document.querySelector('#appareils');

// J'initialise un tableau vide qui contiendra la liste des ingrédients.
let tabIngredients = [];

// J'initialise un tableau vide qui contiendra les appareils.
let tabAppareils = [];

// J'initialise un tableau vide qui contiendra les ustensiles.
let tabUstensiles = [];

// AFFICHAGE INITIAL
// affichage des items dans leurs dropdown respectifs
function displayDropdownItems(recipes, types, tagFiltered) {
    //J'évalue les types.
    switch (types) {
        // Dans le cas des ingredients.
        case 'ingredients':
            //Je créé un tableau vide d'ingr dans cette fonction.
            tabIngredients = [];

            // Pour chaque recette,
            recipes.forEach((recette) => {
                // Je re-boucle sur les tableaux d'ingrédients pour les concatener.
                recette.ingredients.forEach((ingredient) => {
                    // J'uniformise tout en minuscule.
                    ingredient = ingredient.ingredient.toLowerCase();
                    //Je créé une variable qui trouvera l'ingrédient qui sera dans la valeur du tag.
                    let ingredientIsFiltered = tagFiltered.find((tag) => tag.value === ingredient);

                    // Je remet seulement la 1ere lettre en majuscule.
                    ingredient = ingredient[0].toUpperCase() + ingredient.slice(1);

                    // Je remplis le tableau et evite les doublons.
                    //Si tabingr qui inclus ingr est faux et que ingr filtré est undefini,
                    if (tabIngredients.includes(ingredient) == false && ingredientIsFiltered == undefined) {
                        //J'ajoute l'element à la fin du tableau et je retourne la nouvelle taille du tableau(je reduis donc le tableau).
                        tabIngredients.push(ingredient);
                    }
                });
            });

            // Je classe par ordre alphabétique.
            tabIngredients = tabIngredients.sort();

            // Je supprime les items affichés avant de reboucler dessus et refaire un affichage filtré.
            //Pour chaque element qui se trouve dans la div ingredients.
            document.querySelectorAll('#ingredients div').forEach((elt) => {
                //Je supprime l'élément.
                elt.remove();
            });

            // Je boucle sur chaque ingrédient et je reaffiche les ingrédients triés par nom.
            //GenerateItems est créé dans display.js.
            generateItems(tabIngredients, dropIngredients, 'ingredients');

            break;

        // Dans le cas des appareils:
        case 'appareils':
            //Je créé un tableau vide d'appareils dans cette fonction.
            tabAppareils = [];

            // Pour chaque recette,
            recipes.forEach((recette) => {
                //Je créé une variable qui correspondra aux appareils necessaire de la recette.
                let appareil = recette.appliance;

                // J'uniformise tout en minuscule.
                appareil = appareil.toLowerCase();

                //Je créé une variable qui trouvera l'appareil qui sera dans la valeur du tag.
                let appareilIsFiltered = tagFiltered.find((tag) => tag.value === appareil);

                // Je remet seulement la 1ere lettre en majuscule.
                appareil = appareil[0].toUpperCase() + appareil.slice(1);

                // Je remplis le tableau et evite les doublons.
                //Si tabapp qui inclus app est faux et que app filtré est undefini,
                if (tabAppareils.includes(appareil) == false && appareilIsFiltered == undefined) {
                    //J'ajoute l'element à la fin du tableau et je retourne la nouvelle taille du tableau(je reduis donc le tableau).
                    tabAppareils.push(appareil);
                }
            });

            // Je classe par ordre alphabétique.
            tabAppareils = tabAppareils.sort();

            // Je supprime les items affichés avant de reboucler dessus et refaire un affichage filtré.
            //Pour chaque element qui se trouve dans la div appareils.
            document.querySelectorAll('#appareils div').forEach((elt) => {
                //Je supprime l'élément.
                elt.remove();
            });

            // Je boucle sur chaque appareil.
            generateItems(tabAppareils, dropAppareils, 'appareils');

            break;

        // Dans le cas des ustensiles:
        case 'ustensiles':
            //Je créé un tableau vide d'ustensiles dans cette fonction.
            tabUstensiles = [];

            // Pour chaque recette.
            recipes.forEach((recette) => {
                //Je créé une variable qui crée un nouveau tableau avec le nom de chaque ustensile en lettre minuscule pour chaque recette.
                let ustensiles = recette.ustensils.map((name) => name.toLowerCase());

                // Je met la 1ere lettre en majuscule;
                ustensiles.forEach((ustensile) => {
                    ustensile = ustensile[0].toUpperCase() + ustensile.slice(1);

                    //Je créé une variable qui trouvera l'ustensile qui sera dans la valeur du tag qui sera en minuscule.
                    let ustensileIsFiltered = tagFiltered.find(
                        (tag) => tag.value === ustensile.toLowerCase(),
                    );

                    // Je remplis le tableau et evite les doublons.
                    //Si tabUst qui inclus ust est faux et que ust filtré est undefini,
                    if (tabUstensiles.includes(ustensile) == false && ustensileIsFiltered == undefined) {
                        //J'ajoute l'element à la fin du tableau et je retourne la nouvelle taille du tableau(je reduis donc le tableau).
                        tabUstensiles.push(ustensile);
                    }
                });
            });

            // Je classe par ordre alphabétique.
            tabUstensiles = tabUstensiles.sort();

            // Je supprime les items affichés avant de reboucler dessus et refaire un affichage filtré.
            //Pour chaque element qui se trouve dans la div ustensiles.
            document.querySelectorAll('#ustensiles div').forEach((elt) => {
                //Je supprime l'élément.
                elt.remove();
            });

            // Je boucle sur chaque ustensile.
            generateItems(tabUstensiles, dropUstensiles, 'ustensiles');

            break;
    }
}
