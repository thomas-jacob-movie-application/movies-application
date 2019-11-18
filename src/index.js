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
    // .then(() => {
    // })
    .then((movies) => {
      console.log('Here are all the movies:');
      $('#preloader').html("");
      movies.forEach(({title, rating, id, image}) => {
          $('#movieHolder').append(`
            <div class="card col-md-3 p-1">
               <img src=${image} alt="yes">
               <h1>${title}</h1>
               <h3>Rating: ${rating} stars</h3>
               <i class="far fa-trash-alt trash"></i>
          </div>
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


$('#searchButton').on('click',(e) => {
    e.preventDefault();
    getMovies()
        .then((movies) => {
            movies.forEach(({title, rating, id, image}) => {
                if (title.toLowerCase().includes($('#searchText').val().toLowerCase())) {
                    $('#movieHolder').html(`
                <div class="card col-md-3">
                   <img src=${image} alt="yes">
                   <h1>${title}</h1>
                   <h3>Rating: ${rating} stars</h3>
                     <i class="far fa-trash-alt trash"></i>
                </div>
                `)
                }
            })
        })
});


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
let idVariable = `api/movies/${id}`;
$('.trash').on('click',() => {
    $(this).deleteMovie(idVariable);
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });





