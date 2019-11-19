
const {makePoster, getMovies, postMovie, patchMovie, deleteMovie} = require('./api.js');


//************************
//      GET MOVIES
//************************

$(document).ready(() => {
// load movies upon page load
    //create variable for title
    // use title in fetch request
    // fetch get movie >> movie poster (http)
    // turn movie poster into var which contains img src
    // use variable in building divs
function summonAll() {
        getMovies()
            .then((movies) => {
                let makeMoviesAppear = (movies) => {
                    $('#preloader').addClass("invisible");
                    movies.forEach(({title, rating, id}) => {
                        makePoster(title)
                            .then((data) => {
                                let image = "'" + data.Poster + "'";
                                $('#movieHolder').append(`
                        <div class="card col-md-3 p-1" id="${id}">
                           <img src=${image}>
                           <h1>${title}</h1>
                           <h3>${rating} stars</h3>
                           <i class="far fa-trash-alt trash" id="${id}"></i>
                           <i class="fas fa-edit edit"></i> 
                        </div>
                       `)
                            })
                            .then((data) => {
                                clickTrashFunction();

                            });
                            })
                };
                makeMoviesAppear(movies)
            });
    };
summonAll();



function clickTrashFunction () {
    $('.edit').off().on('click', function () {
        console.log("hi");
        let newId = $(this).parent().attr('id');
        console.log(newId);
        let oldTitle = $(this).parent().children().first().next().html().substr(0, 35);
        let oldRating = $(this).parent().children().first().next().next().html().substr(0, 1);
        $('#editText').val(oldTitle);
        $('#editRating').val(oldRating);
        $('.popUp').removeClass('invisible');
        $('.editButton').on('click', function () {
            $('.popUp').addClass('invisible');
            let newTitle = $('#editText').val();
            let newRating = $('#editRating').val();
            patchMovie({
                "title": newTitle,
                "rating": newRating,
            }, newId);
            $('#movieHolder').html("");
            $('#preloader').removeClass('invisible');
            summonAll();
        });
    });
    getMovies()
        .then((movies) => {
            $('.trash').off().on('click',((e) =>{
                let divId = (e.target.id);
                deleteMovie(divId);
                $('#movieHolder').html("");
                $('#preloader').removeClass("invisible");
                summonAll();
            })) ;
        })
    };
$('#close').click(function() {
    $('.popUp').addClass('invisible');
})


    //************************
    //      ADD NEW MOVIE
    //************************


    $('#addButton').off().on('click',(() => {
        let newMovie = postMovie({
            "title": $('#addText').val(),
            "rating": $('#addSelect').val(),
        });
        $('#movieHolder').html("");
        $('#preloader').removeClass('invisible');
        getMovies()
            .then((movies) => {
                summonAll();
                $('#preloader').addClass('invisible');
            });

    }));



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
                        makePoster(title)
                            .then((data) => {
                                let image = "'" + data.Poster + "'";
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
                            })
                            .then((data) => {
                                clickTrashFunction();
                            })
                    }
                })
            })
    });
});
