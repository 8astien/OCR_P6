document.addEventListener('DOMContentLoaded', function () {
    // Configuration pour le premier carousel (films les mieux notés)
    fetchTopRatedMovies();
    fetchCategoryMovies('Comedy', '.carousel__container--two');
    fetchCategoryMovies('Thriller', '.carousel__container--three');
    fetchCategoryMovies('Crime', '.carousel__container--four');
});

function fetchTopRatedMovies() {
    // Première page
    fetch('http://127.0.0.1:8000/api/v1/titles?sort_by=-imdb_score')
        .then(response => response.json())
        .then(data => {
            const firstPageResults = data.results.slice(1); // PAS BESOIN DU 1ER
            // Deuxième page
            if (data.next) {
                fetch(data.next)
                    .then(response => response.json())
                    .then(secondPageData => {
                        const secondPageResults = secondPageData.results.slice(0, 3); // Prendre les trois premiers résultats de la deuxième page
                        const allResults = [...firstPageResults, ...secondPageResults];
                        updateCarouselWithMovies(allResults, '.carousel__container--one');
                    })
                    .catch(error => console.error('Erreur lors de la récupération des films (page 2):', error));
            } else {
                updateCarouselWithMovies(firstPageResults, '.carousel__container--one');
            }
        })
        .catch(error => console.error('Erreur lors de la récupération des films (page 1):', error));
}

function fetchCategoryMovies(category, containerClass) {
    fetch(`http://127.0.0.1:8000/api/v1/titles?genre=${category}&sort_by=-imdb_score`)
        .then(response => response.json())
        .then(data => {
            let movies = data.results.slice(0, 7); // Obtenez les 7 premiers films

            // Vérifiez s'il y a une page suivante et récupérez les films supplémentaires si nécessaire
            if (data.next) {
                fetch(data.next)
                    .then(response => response.json())
                    .then(secondPageData => {
                        const additionalMovies = secondPageData.results.slice(0, 7 - movies.length);
                        movies = [...movies, ...additionalMovies];
                        updateCarouselWithMovies(movies, containerClass);
                    })
                    .catch(error => console.error(`Erreur lors de la récupération des films supplémentaires pour ${category} (page 2):`, error));
            } else {
                updateCarouselWithMovies(movies, containerClass);
            }
        })
        .catch(error => console.error(`Erreur lors de la récupération des films (${category}):`, error));
}


function updateCarouselWithMovies(movies, containerClass) {
    const carouselContainer = document.querySelector(containerClass);
    carouselContainer.innerHTML = ''; // Nettoyez le conteneur avant d'ajouter de nouveaux éléments
    movies.forEach(movie => {
        const carouselItem = document.createElement('div');
        carouselItem.className = 'carousel__item';

        const movieImage = document.createElement('img');
        movieImage.className = 'carousel__img';
        movieImage.src = movie.image_url;
        movieImage.alt = movie.title;
        movieImage.setAttribute('data-film-id', movie.id);
        carouselItem.appendChild(movieImage);
        carouselContainer.appendChild(carouselItem);
    });

    attachEventListenersToCarouselImages();
}

function attachEventListenersToCarouselImages() {
    document.querySelectorAll('.carousel__img').forEach(item => {
        item.addEventListener('click', function (event) {
            const filmId = event.currentTarget.getAttribute('data-film-id');
            openModal(filmId);
        });
    });

    // Attachez les événements de défilement uniquement si le carrousel spécifique est présent
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => {
        const container = carousel.querySelector('.carousel__container');
        const btnLeft = carousel.querySelector('.carousel__button--left');
        const btnRight = carousel.querySelector('.carousel__button--right');

        if(container && btnLeft && btnRight) {
            const itemWidth = container.querySelector('.carousel__item')?.clientWidth || 0;

            btnRight.addEventListener('click', () => {
                container.scrollLeft += itemWidth;
            });

            btnLeft.addEventListener('click', () => {
                container.scrollLeft -= itemWidth;
            });
        }
    });
}

