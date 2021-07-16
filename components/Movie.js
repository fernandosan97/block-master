import getMovieInfo from '../js/getInfoMovie.js';

function Movie({ poster_path, vote_average, id, title }) {
    const averageClass = vote_average > 7 ? 'most-valued' : 'least-valued';

    const template =  `
        <div class="movie-item">
            <div class="movie-img">
                <img src="${poster_path}" alt="Cover ${title}">
            </div>
            <button class="movie-score ${averageClass}" data-id="${id}">
                ⭐️ ${vote_average}
            </button>
        </div>
    `;

    const movie = document.createElement('div');
    movie.innerHTML = template;
    return template;
}

export default Movie;