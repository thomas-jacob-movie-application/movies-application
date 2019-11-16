/**
 * es6 modules and imports
 */


/**
 * require style imports
 */

const {getMovie, getMovies, createMovie, patchMovie, deleteMovie} = require('./api.js');

//************************
//      GET MOVIES
//************************

getMovies()
    .then((movies) => {
      console.log('Here are all the movies:');
      movies.forEach(({title, rating, id, image}) => {
         $('#movieHolder').append(`
            <div class="card col-md-3">
               <img src=${image} alt="yes">
               <h1>${title}</h1>
               <h3>${rating}</h3>
         `)
          console.log(`id#${id} - ${title} - rating: ${rating}`);
      });
    }).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});

//************************
//      SPECIFY ONE MOVIE
//************************
//this doesn't exactly function right now without a solid query function

    // $('#searchButton').on('click',(e) =>{
    //     getMovie($('#searchText').val())
    //         .then((movie) => {
    //             console.log('Here is the first movie: ');
    //             console.log(`id#${movie.id} - ${movie.title} - rating: ${movie.rating}`);
    //         })
    //         .catch((error) => {
    //             alert('Oh no! Something went wrong.\nCheck the console for details.');
    //             console.log(error);
    //         });
    //     e.preventDefault();
    //
    // })


//************************
//      ADD NEW MOVIE
//************************

// createMovie({
// }).then(getMovies).then((movies) => {
//   console.log('Here are all the movies: ');
//   movies.forEach(({title, rating}) => {
//     console.log(`title:${title} - rating: ${rating}`);
//   });
// }).catch((error) => {
//   alert('Oh no! Something went wrong.\nCheck the console for details.');
//   console.log(error);
// });

//************************
//      EDIT MOVIE DATA
//************************

// patchMovie({
//   "title": "Darjeeling Limited",
//   "rating": "5"
// }, 3).then(getMovies).then((movies) => {
//   console.log('Here are all the books:');
//   movies.forEach(({title, rating}) => {
//     console.log(`${title}, ${rating}`);
//   });
// }).catch((error) => {
//   alert('Oh no! Something went wrong.\nCheck the console for details.');
//   console.log(error);
// });

//************************
//      DELETE MOVIE
//************************

// deleteMovie(4).then(getMovies).then((movies) => {
//   console.log('Here are all the books:');
//   movies.forEach(({title, rating}) => {
//     console.log(`Title: ${title}
//     Rating: ${rating}`);
//   });
// }).catch((error) => {
//   alert('Oh no! Something went wrong.\nCheck the console for details.');
//   console.log(error);
// });
