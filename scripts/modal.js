document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('movieModal');
    const modalClose = document.querySelector('.modal__close');
    const bestRatedButton = document.querySelector('.best--rated button');

    // Fonction pour ouvrir la modale avec les détails du film
    function openModal(filmId) {
        if (filmId) {
            fetchFilmDetailsAndOpenModal(filmId);
        }
    }
    window.openModal = openModal; // Rendre cette fonction accessible à l'extérieur

    // Gestionnaire d'événements pour le bouton 'best-rated'
    bestRatedButton.addEventListener('click', function () {
        const filmId = document.getElementById('bestRatedImage').getAttribute('data-film-id');
        openModal(filmId);
    });

    // Fermer la modale quand on clique sur le bouton de fermeture ou en dehors de la modale
    modalClose.addEventListener('click', closeModal);
    window.onclick = function (event) {
        if (event.target == modal) {
            closeModal();
        }
    };
});

function closeModal() {
    const modal = document.getElementById('movieModal');
    modal.style.display = 'none';
}

// Fonction pour récupérer les détails du film et ouvrir la modale
function fetchFilmDetailsAndOpenModal(filmId) {
    fetch(`http://127.0.0.1:8000/api/v1/titles/${filmId}`)
        .then(response => response.json())
        .then(movieDetails => {
            const modal = document.getElementById('movieModal');
            updateModalContent(movieDetails);
            modal.style.display = 'block';
        })
        .catch(error => console.error('Erreur lors de la récupération des détails du film:', error));
}

// Fonction pour mettre à jour le contenu de la modale
function updateModalContent(movieDetails) {
    const modal = document.getElementById('movieModal');
    modal.querySelector('.modal__image').src = movieDetails.image_url;
    modal.querySelector('.modal__title').textContent = "Titre : " + movieDetails.title;
    modal.querySelector('.modal__genre').textContent = "Genre : " + movieDetails.genres.join(', ');
    modal.querySelector('.modal__release-date').textContent = "Date de sortie : " + movieDetails.date_published;
    modal.querySelector('.modal__rated').textContent = "Rated : " + movieDetails.rated;
    modal.querySelector('.modal__imdb-score').textContent = "Score Imdb : " + movieDetails.imdb_score;
    modal.querySelector('.modal__director').textContent = "Réalisateur : " + movieDetails.directors.join(', ');
    modal.querySelector('.modal__actors').textContent = "Casting : " + movieDetails.actors.join(', ');
    modal.querySelector('.modal__duration').textContent = "Durée : " + movieDetails.duration + " min";
    modal.querySelector('.modal__country').textContent = "Pays d'origine : " + movieDetails.countries.join(', ');
    modal.querySelector('.modal__box-office').textContent = "Résultat Box Office : " + movieDetails.worldwide_gross_income;
    modal.querySelector('.modal__summary').textContent = "Résumé : " + movieDetails.long_description;
}
