
module.exports = {

  //get all movies
    getMovies: () => {
      return fetch('/api/movies')
          .then(response => response.json())

    },


    postMovie : (movie) => {
        return fetch('api/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movie),
        })
    },



  //
  // //edit movie data
  //   patchMovie : (movie, id) => {
  //     return fetch(`api/movies/${id}`, {
  //       method: 'PATCH',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(movie),
  //     })
  //   },
  //


  //delete movie data
    deleteMovie : (id) => {
      return fetch(`api/movies/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

}
