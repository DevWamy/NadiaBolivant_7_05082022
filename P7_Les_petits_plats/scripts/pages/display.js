//J'initie un tableau vide qui sera utilisé tout au long du processus afin de filtrer las tags.
let tagFiltered = [];

// Boucle sur les données.
async function init() {
    // Affichage par défaut de toutes les recettes au chargement de la page.
    displayRecipes(recipes);

    // initialisation du tri des items
    displayDropdownItems(recipes, 'ingredients', tagFiltered);

    displayDropdownItems(recipes, 'appareils', tagFiltered);

    displayDropdownItems(recipes, 'ustensiles', tagFiltered);
}

init();

// Appel de la boucle pour les cartes de recette.
function generateCards(recettes) {
    // Je parcours les recettes.
    recettes.forEach((recette) => {
        recipeCardsFactory(recette);
    });
}

//DROPDOWNS

// Appel de la boucle pour les items de chaque dropdown.
function generateItems(tab, domBlock, type) {
    tab.forEach((item) => {
        itemNormalized = normalizeString(item);

        const itemsDOM = `<div class="col-3 item-${itemNormalized}" onclick="addTag('${item}', '${type}')">${item}</div>`;

        domBlock.insertAdjacentHTML('beforeEnd', itemsDOM);
    });
}
// Gestion des animations sur les dropdowns
window.addEventListener('load', function () {
    // J'attend que la page se charge avant de travailler avec des éléments HTML.
    document.addEventListener('click', function (event) {
        // J'enleve col-md-7 à ceux qui ne sont pas cliqués.
        document.querySelectorAll('.dropdowns').forEach(function (el) {
            // Je ferme toute liste déroulante qui n'est pas celle sur laquelle on vient de cliquer.
            if (el !== event.target) {
                el.classList.remove('col-lg-7');
                el.classList.add('col-lg-3');
                el.classList.add('col-xl-2');
                el.classList.add('rounded-bottom');
            }
        });
        // Je cache le dropdown à ceux qui ne sont pas cliqués.
        document.querySelectorAll('.dropdown-content').forEach(function (el) {
            // Je ferme toute liste déroulante qui n'est pas celle sur laquelle on vient de cliquer.
            if (el !== event.target) {
                el.classList.remove('show');
            }
        });

        // Je cache la fleche haut.
        document.querySelectorAll('.dropbtn .fa-chevron-up').forEach(function (el) {
            // Je ferme toute liste déroulante qui n'est pas celle sur laquelle on vient de cliquer.
            if (el !== event.target) {
                el.classList.add('d-none');
            }
        });

        // Je montre la flèche bas.
        document.querySelectorAll('.dropbtn .fa-chevron-down').forEach(function (el) {
            // Je ferme toute liste déroulante qui n'est pas celle sur laquelle on vient de cliquer.
            if (el !== event.target) {
                el.classList.remove('d-none');
            }
        });

        // Si je suis bien sur le dropdown cliqué:
        if (event.target.matches('.dropbtn')) {
            // J'affiche le dropdown.
            event.target.closest('.dropdowns').querySelector('.dropdown-content').classList.toggle('show');

            // J'ajoute des colonnes.
            event.target.closest('.dropdowns').classList.add('col-lg-7');

            // Et j'en supprime d'autres et la bordure en dessous.
            event.target.closest('.dropdowns').classList.remove('col-xl-2');
            event.target.closest('.dropdowns').classList.remove('col-lg-3');
            event.target.closest('.dropdowns').classList.remove('rounded-bottom');

            // Je change la fleche.
            event.target
                .closest('.dropdowns')
                .querySelector('.dropbtn .fa-chevron-up')
                .classList.remove('d-none');
            event.target
                .closest('.dropdowns')
                .querySelector('.dropbtn .fa-chevron-down')
                .classList.add('d-none');
        }
    });
});

// GESTION DES TAGS
function tagFilter(tagFiltered) {
    let recipesFiltered = recipes;

    // Si le tableau de tags n'est pas vide je filtre selon les tags
    if (tagFiltered.length !== 0) {
        tagFiltered.forEach((tag) => {
            recipesFiltered = recipesFiltered.filter((recette) => {
                // Je fais un lowercase sur tag.value pour bien comparer ensuite.
                tag.value = tag.value.toLowerCase();

                // INGREDIENTS
                if (tag.type == 'ingredients') {
                    let ingredientfounded = false;

                    for (let i = 0; i < recette.ingredients.length; i++) {
                        if (recette.ingredients[i].ingredient.toLowerCase() == tag.value) {
                            ingredientfounded = true;
                            break;
                        }
                    }
                    if (ingredientfounded == true) {
                        return recette;
                    }
                }
                // APPAREILS
                if (tag.type == 'appareils') {
                    let apapreilfounded = false;

                    if (recette.appliance.toLowerCase() == tag.value) {
                        apapreilfounded = true;
                    }
                    if (apapreilfounded == true) {
                        return recette;
                    }
                }
                // USTENSILES
                if (tag.type == 'ustensiles') {
                    let ustensilsfounded = false;

                    for (let i = 0; i < recette.ustensils.length; i++) {
                        if (recette.ustensils[i].toLowerCase() == tag.value) {
                            ustensilsfounded = true;
                            break;
                        }
                    }
                    if (ustensilsfounded == true) {
                        return recette;
                    }
                }
            });
        });
    }
    // si le tableau de tags est vide je réutilise recipes
    else {
        recipesFiltered = recipes;
    }

    // je supprime les articles affichés avant de reboucler dessus et refaire un affrichage filtré
    document.querySelectorAll('.article-recette').forEach((elt) => {
        elt.remove();
    });

    // je réaffiche les recetts filtrées par tags
    generateCards(recipesFiltered);

    // je rafraichis l'affichage des items dans les dropdowns
    displayDropdownItems(recipesFiltered, 'ingredients', tagFiltered);

    displayDropdownItems(recipesFiltered, 'appareils', tagFiltered);

    displayDropdownItems(recipesFiltered, 'ustensiles', tagFiltered);

    errorMessage(recipesFiltered);
}

// AJOUT DU TAG
// au click sur un item
// ajout du tag dans le dom et le push dans le tableau
function addTag(itemTag, type) {
    itemTagNormalized = normalizeString(itemTag);

    // Je crée le texte recherché
    const tagItemDOM = `<div class="rounded p-2 mb-3 tag-${type} tag-${itemTagNormalized}" data-type="${type}" data-value="${itemTag}">${itemTag} &nbsp;<i class="bi bi-x-circle" onclick="removeTag('${type}', '${itemTag}')"></i></div>`;

    // je prends la div qui contiendra les tags
    let currentTag = document.querySelector('.filtres-actifs');

    // j'insere les nouveaux tags
    currentTag.insertAdjacentHTML('beforeEnd', tagItemDOM);

    // je push chaque nouveau tag en objet dans le tableau tagFiltered
    tagFiltered.push({
        type: type,
        value: itemTag,
    });

    tagFilter(tagFiltered);
}

function removeTag(type, value) {
    value = value.toLowerCase();

    valueClass = normalizeString(value);

    document.querySelector('.filtres-actifs .tag-' + valueClass).remove();

    tagFiltered = tagFiltered.filter((tag) => tag.value !== value);

    tagFilter(tagFiltered);
}

function normalizeString(string) {
    const diacriticRegex = new RegExp(/\p{Diacritic}/, 'gu');
    const spaceRegex = new RegExp(/\s/, 'g');
    return string
        .normalize('NFD') // returns the string in normalized Unicode form with decomposition of diacritics (accents, umlauts, cedillas, etc.)
        .replace(diacriticRegex, '') // remove diacritics
        .toLowerCase()
        .replace(spaceRegex, ''); // remove all spaces
}

function errorMessage(recettes) {
    // si il n'y à aucune recette trouvée j'affiche un message d'erreur
    if (recettes.length == 0) {
        document.querySelector('.no-recipies').classList.remove('d-none');
    } else {
        document.querySelector('.no-recipies').classList.add('d-none');
    }
}
