import movies from './movie-data.js';

const setEventGetInfoMovie = ($movieList) => {
    $movieList.addEventListener('click', (e) => {
        if(e.target.classList.contains('movie-score')) {
            getMovieInfo(e.target.dataset.id);
        }
    
        e.stopPropagation();
    });
}


function getMovieInfo(id){
    const movie = movies.filter(movie => movie.id === parseInt(id));
     renderMovie(movie[0]);
}

function renderMovie({ poster_path, vote_average, id, overview, title, release_date }) {
    const averageClass = vote_average > 7 ? 'most-valued' : 'least-valued';

    const main = document.querySelector('.main');
    main.removeChild(main.lastChild);

    const body = document.querySelector('.body');
    body.style.overflow = 'hidden';
    
    const modal = document.createElement('div');
    modal.classList.add('overlay');

    const template = `
        <div class="container">
            <div class="modal-movie">
                <button class="button-close" id="btn-close">
                    <img src="./assets/icon-close.png" alt="">
                </button>
                <div class="movie-cover">
                    <div class="movie-item">
                        <div class="movie-img">
                            <img src="${poster_path}" alt="${title}">
                        </div>
                        <button class="movie-score most-valued" data-id="3142">
                            ⭐️ ${vote_average}
                        </button>
                    </div>
                </div>
                <div class="movie-info">
                    <h2 class="movie-title">${title}</h2>
                    <p class="movie-description">${overview}</p>
                    <ul class="movie-more">
                        <li>${release_date.split('-')[0]}</li>
                    </ul>
                    <div class="movie-buttons">
                        <a href="#" class="button-cta btn-primary margin-right">
                            <img src="./assets/icon-play.png" alt="Icon play" aria-hidden="true">
                            <span>VER AHORA</span>
                        </a>
                        <a href="#" class="button-cta btn-secondary">
                            <img src="./assets/icon-plus.png" alt="Icon play" aria-hidden="true">
                            <span>VER DESPUES</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;

    modal.innerHTML = template;
    main.appendChild(modal);
    closeModal();
} 

function closeModal() {
    const btnClose = document.querySelector('#btn-close');
    const modal = document.querySelector('.overlay');
    const body = document.querySelector('.body');

    btnClose.addEventListener('click', () => {
        modal.style.display= 'none';
        body.style.overflow = 'auto';
    });
}

export default setEventGetInfoMovie;