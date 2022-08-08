// Je selectionne les dropdowns qui afficherons les elements filtrables.
let dropIngredients = document.querySelector('#ingredients');
let dropUstensiles = document.querySelector('#ustensiles');
let dropAppareils = document.querySelector('#appareils');

// Je récupere le champ de recherche ingredient.
let inputIngredient = document.querySelector('#input-ingredients');

// Je récupere le champ de recherche appareil.
let inputAppareils = document.querySelector('#input-appareils');

// Je récupere le champ de recherche ustensile.
let inputUstensiles = document.querySelector('#input-ustensiles');

// J'initialise un tableau vide qui contiendra la liste des ingrédients.
let tabIngredients = [];

// J'initialise un tableau vide qui contiendra les appareils.
let tabAppareils = [];

// J'initialise un tableau vide qui contiendra les ustensiles.
let tabUstensiles = [];

// AFFICHAGE INITIAL
// affichage des items dans leurs dropdown respectifs
function displayDropdownItems(recipes, types, tagFiltered) {
    switch (types) {
        // Affichage des ingredients.
        case 'ingredients':
            tabIngredients = [];

            // Je boucle sur chaque recette.
            recipes.forEach((recette) => {
                // Je re-boucle sur les tableaux d'ingrédients pour les concatener.
                recette.ingredients.forEach((ingredient) => {
                    // J'uniformise tout en minuscule.
                    ingredient = ingredient.ingredient.toLowerCase();

                    let ingredientIsFiltered = tagFiltered.find((tag) => tag.value === ingredient);

                    // Je remet seulement la 1ere lettre en majuscule.
                    ingredient = ingredient[0].toUpperCase() + ingredient.slice(1);

                    // Je remplis le tableau et evite les doublons.
                    if (tabIngredients.includes(ingredient) == false && ingredientIsFiltered == undefined) {
                        tabIngredients.push(ingredient);
                    }
                });
            });

            // Je classe par ordre alphabétique.
            tabIngredients = tabIngredients.sort();

            // Je supprime les items affichés avant de reboucler dessus et refaire un affichage filtré.
            document.querySelectorAll('#ingredients div').forEach((elt) => {
                elt.remove();
            });

            // Je boucle sur chaque ingrédient et je reaffiche les ingrédients triés par nom.
            generateItems(tabIngredients, dropIngredients, 'ingredients');

            break;

        // affichage des appareils
        case 'appareils':
            tabAppareils = [];

            // Je boucle sur chaque recette.
            recipes.forEach((recette) => {
                let appareil = recette.appliance;

                // J'uniformise tout en minuscule.
                appareil = appareil.toLowerCase();

                let appareilIsFiltered = tagFiltered.find((tag) => tag.value === appareil);

                // Je remet seulement la 1ere lettre en majuscule.
                appareil = appareil[0].toUpperCase() + appareil.slice(1);

                // Je remplis le tableau et evite les doublons.
                if (tabAppareils.includes(appareil) == false && appareilIsFiltered == undefined) {
                    tabAppareils.push(appareil);
                }
            });

            // Je classe par ordre alphabétique.
            tabAppareils = tabAppareils.sort();

            // Je supprime les items affichés avant de reboucler dessus et refaire un affichage filtré.
            document.querySelectorAll('#appareils div').forEach((elt) => {
                elt.remove();
            });

            // Je boucle sur chaque appareil.
            generateItems(tabAppareils, dropAppareils, 'appareils');

            break;

        // Affichage des ustensiles.
        case 'ustensiles':
            tabUstensiles = [];

            // Je boucle sur chaque recette.
            recipes.forEach((recette) => {
                let ustensiles = recette.ustensils.map((name) => name.toLowerCase());

                // Je met la 1ere lettre en majuscule;
                ustensiles.forEach((ustensile) => {
                    ustensile = ustensile[0].toUpperCase() + ustensile.slice(1);

                    let ustensileIsFiltered = tagFiltered.find(
                        (tag) => tag.value === ustensile.toLowerCase(),
                    );

                    // Je remplis le tableau et evite les doublons.
                    if (tabUstensiles.includes(ustensile) == false && ustensileIsFiltered == undefined) {
                        tabUstensiles.push(ustensile);
                    }
                });
            });

            // Je classe par ordre alphabétique.
            tabUstensiles = tabUstensiles.sort();

            // Je supprime les items affichés avant de reboucler dessus et refaire un affichage filtré.
            document.querySelectorAll('#ustensiles div').forEach((elt) => {
                elt.remove();
            });

            // Je boucle sur chaque ustensile.
            generateItems(tabUstensiles, dropUstensiles, 'ustensiles');

            break;
    }
}
