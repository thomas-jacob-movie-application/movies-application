/**
 * es6 modules and imports
 */


/**
 * require style imports
 */





const {getMovie, getMovies, postMovie, patchMovie, deleteMovie} = require('./api.js');


//************************
//      GET MOVIES
//************************

$(document).ready(() => {


    //TEST OUT FUNCTION ONCE YOU HAVE ACTUAL MOVIES IN DB
    let i = 0;
    getMovies()
        .then((movies) => {
            let makeMoviesAppear = (movies) => {
                $('#preloader').addClass("invisible");
                movies.forEach(({title, rating, id, image}) => {
                    $('#movieHolder').append(`
                    <div class="card col-md-3 p-1" id="${id}">
                       <img src=${image} alt="yes">
                       <h1>${title}</h1>
                       <h3>Rating: ${rating} stars</h3>
                       <i class="far fa-trash-alt trash"></i> 
                       <i class="fas fa-edit edit"></i>       
                       <h6>${id}</h6>   
                  </div>
                `);
                });
                $('.edit').on('click', function () {
                    let newId = $(this).parent().children().first().next().next().next().next().next().html();
                    console.log(newId);
                    let newTitle = $(this).parent().children().first().next().html().substr(0, 100);
                    console.log(newTitle);
                    let newRating = $(this).parent().children().first().next().next().html().substr(7, 2);
                    console.log(newRating);
                    $('#editText').val(newTitle);
                    $('#editRating').val(newRating);
                    $('.popUp').removeClass('invisible');
                    $('.editButton').on('click',function() {
                        newTitle = $('#editText').val();
                        newRating = $('#editRating').val();
                            patchMovie({
                                "title": newTitle,
                                "rating": newRating
                            },    newId)
                        $('#movieHolder').html("");
                        getMovies()
                            .then((movies) => {
                                makeMoviesAppear(movies)
                            });
                        })
                    })

                $('.trash').click(function () {
                    let idVariable = $(this).parent().attr('id');
                    deleteMovie(idVariable);
                    getMovies()
                        .then((movies) => {
                            makeMoviesAppear(movies)
                        });
                    })
                };
            //wrong place for this
            makeMoviesAppear(movies);


            //************************
            //      ADD NEW MOVIE
            //************************
            $('#addButton').click(() => {
                let newMovie = postMovie({
                    "title": $('#addText').val(),
                    "rating": $('#addSelect').val(),
                });
                // $('#movieHolder').html("");
                // $('#preloader').removeClass('invisible');
                getMovies()
                    .then((movies) => {
                        makeMoviesAppear(movies);
                        $('#preloader').addClass('invisible');
                    });

            });





                //************************
            //      SPECIFY ONE MOVIE
            //************************


            //FIND A WAY TO USE GETMOVIE
            $('#searchButton').on('click', (e) => {
                e.preventDefault();
                getMovies()
                    .then((movies) => {
                        movies.forEach(({title, rating, id, image}) => {
                            if (title.toLowerCase().includes($('#searchText').val().toLowerCase())) {
                                $('#movieHolder').html(`
                                        <div class="card col-md-3">
                                           <img src=${image} alt="yes">
                                           <h1>${title}</h1>
                                           <div id="popUp"></div>
                                           <h3>Rating: ${rating} stars</h3>
                                             <i class="far fa-trash-alt trash"></i>
                                             <i class="fas fa-edit edit"></i>
                                        </div>
                                        `)
                            }
                        })
                    })
            });

        })

    // .then((movies) => {
    // console.log('Here are all the movies: ');
    // movies.forEach(({title, rating}) => {
    //     console.log(`title:${title} - rating: ${rating}`);
    // });
    // }).catch((error) => {
    //     alert('Oh no! Something went wrong.\nCheck the console for details.');
    //     console.log(error);
    // });

//************************
//      EDIT MOVIE DATA
//************************

// .then(getMovies).then((movies) => {
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


})