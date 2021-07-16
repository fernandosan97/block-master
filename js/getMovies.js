import movies from './movie-data.js';
import Movie from '../components/Movie.js';
import setEventGetInfoMovie from './getInfoMovie.js';

let moviesList = [];
const $main = document.querySelector('main');
const menus = document.querySelectorAll('.menu-item');
let start = 0;
let finish = 10;
let flag = true;

const data = {
    all: allMovies,
    mostValued,
    leastValued
}

function showMovies(text) {
    paintMovies(moviesList, text);
}

function paintMovies(movies, text) {
    const template = `
        <h2 class="title">${text}</h2>
        <div class="movies-list" id="movie-list">
            ${
                movies.map(movie => Movie(movie)).join('')
            }
        </div>
    `;

    $main.innerHTML = template;
    setGetInfoMovies();
}

function setGetInfoMovies() {
    const $moviesList = document.querySelector('#movie-list');
    setEventGetInfoMovie($moviesList);
}

function paintError(search) {
    const template = `
        <div class="searching">
            <img src="../assets/searching.png">
            <h2 class="headline3">No se encontraron resultados de la busqueda "${search}"<h2>
        </div>
    `
    $main.innerHTML = template;
}

function renderMovie(movie) {
    const element = Movie(movie);
    $moviesList.append(element);
}

function allMovies(inicio = 0, fin = 10) {
    flag = false;
    if(inicio > 0) {
        let newMoviesArray = movies.slice(inicio, fin);
        moviesList = [...moviesList, ...newMoviesArray];
    }else {
        moviesList = [...movies.slice(inicio, fin)];
    }

    document.querySelector('#loader').style.display = 'flex';
     
    setTimeout(() => {
        showMovies('Todas las peliculas');
        document.querySelector('#loader').style.display = 'none';
        flag = true;
    }, 1000);
}

function mostValued() {
    flag = false;
    const moviesMostValued = movies.filter(movie => movie.vote_average > 7);
    moviesList = [...moviesMostValued];
    document.querySelector('#loader').style.display = 'flex';

    setTimeout(() => {
        showMovies('Peliculas mas valoradas');
        document.querySelector('#loader').style.display = 'none';
    }, 1000);
}

function leastValued() {
    flag = false;
    const moviesLeastValued = movies.filter(movie => movie.vote_average <= 7);
    moviesList = [...moviesLeastValued];
    document.querySelector('#loader').style.display = 'flex';

    setTimeout(() => {
        showMovies('Peliculas menos valoradas');
        document.querySelector('#loader').style.display = 'none';
    }, 1000);
}

function searchForm(e){
    e.preventDefault();

    const form = e.target;
    const inputSearch = form.querySelector('input').value;
    flag = false;

    const movieFilter = movies.filter(movie => {
        return movie.title.toLowerCase().startsWith(inputSearch.toLowerCase());
    });

    cleanContainer();
    moviesList = [...movieFilter];

    document.querySelector('#loader').style.display = 'flex';

    if(moviesList.length === 0) {
        paintError(inputSearch);
        document.querySelector('#loader').style.display = 'none';
        return;
    }

    setTimeout(() => {
        showMovies('Resultados de busqueda');
        document.querySelector('#loader').style.display = 'none';
    }, 1000);
}

function cleanContainer() {
    $main.innerHTML = '';
}

const handleIntersection = (entries) => {
    if(entries[0].isIntersecting && flag) {
        console.log(entries[0])
        if(start < movies.length) {
            allMovies(start, finish);
            start = finish;
            finish = finish + 10;
        } else {
            console.log('Fin')
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    menus.forEach(menu => {
        menu.addEventListener('click', (e) => {
            const links = document.querySelectorAll('.menu-item');
        
            links.forEach(link => {
                const option =  link.querySelector('a');
                option.classList.remove('active-item');
            });
            
            const activeLink = menu.querySelector('a');
            activeLink.classList.add('active-item');
    
            cleanContainer();
            data[activeLink.dataset.type]();
        });
    });

    const form = document.querySelector('#searchForm');
    form.addEventListener('submit', searchForm);

    const observer = new IntersectionObserver(handleIntersection);
    observer.observe(window.intersector);
});

export default data;

