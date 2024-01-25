document.addEventListener('DOMContentLoaded', function() {
    fetch('http://127.0.0.1:8000/api/v1/titles?sort_by=-imdb_score')
        .then(response => response.json())
        .then(data => {
            const bestMovieId = data.results[0].id;
            fetchMovieDetails(bestMovieId);
        })
        .catch(error => console.error('Erreur lors de la récupération de l’ID du film:', error));
});

function fetchMovieDetails(id) {
    fetch(`http://127.0.0.1:8000/api/v1/titles/${id}`)
        .then(response => response.json())
        .then(movie => {
            updateBestRatedMovie(movie);
        })
        .catch(error => console.error('Erreur lors de la récupération des détails du film:', error));
}


function updateBestRatedMovie(movie) {
    const bestRatedSection = document.querySelector('.best--rated');
    bestRatedSection.querySelector('h3').textContent = movie.title;
    bestRatedSection.querySelector('p').textContent = movie.description;
    const bestRatedImage = document.getElementById('bestRatedImage');
    bestRatedImage.src = movie.image_url;
    bestRatedImage.setAttribute('data-film-id', movie.id);
    bestRatedImage.setAttribute('alt', movie.title);

}
