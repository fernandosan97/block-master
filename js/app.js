import data from '../js/getMovies.js';
import handleSlider from './slider.js';

window.addEventListener('DOMContentLoaded', () => {
    handleSlider();
});




// const mostValued = movies.map(movie => {
//     return {...movie, recommended: movie.vote_average >7};
// });

// console.log(mostValued);

// function draw({ poster_path, vote_average, id }) {
//     const averageClass = vote_average > 7 ? 'most-valued' : 'least-valued';

//     const template =  `
//         <div class="movie-item">
//             <div class="movie-img">
//                 <img src="${poster_path}" alt="Cover movie">
//             </div>
//             <button class="movie-score ${averageClass}" data-id="${id}">
//                 ⭐️ ${vote_average}
//             </button>
//         </div>
//     `;
//     return template;
// }


// const newMovies = movies.map(moview => draw(moview));
// $movieList.innerHTML = newMovies.join('');
