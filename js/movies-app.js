"use strict";
    // ************ LOADER *******************
    $('body').append('<div style="" id="loadingDiv" ><img id="loading-image" src="/img/loading.gif" alt="Loading..." /></div>');
    $(window).on('load', function () {
        setTimeout(removeLoader, 2000); //wait for page load PLUS two seconds.
    });
    function removeLoader() {
        $("#loadingDiv").fadeOut(500, function () {
            // fadeOut complete. Remove the loading div
            $("#loadingDiv").remove(); //makes page more lightweight
        });
        loadMovies();

    }
    // *******************************************************************************************************

function loadMovies() {
    fetch("http://localhost:3000/movies")
        .then(resp => resp.json())
        .then(movieData => {
            console.log(movieData)
           let moviesHTML = movieData.map(movie =>{
                // language = html;
                return `<div class="card" style="width: 18rem;">
                        <img src="${movie.poster}" class="card-img-top" alt="...">
                        <div class="card-body">
                        <h5 class="card-title" id="movie-title">${movie.title}</h5>
                        <p class="card-text" id="movie-plot">${movie.plot}</p>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">Edit</button>
                      </div>
                    </div>
        `
            })
            document.getElementById("movie-cards").innerHTML=moviesHTML.join("");

        })
        .catch(error => {console.error(error)}
        );
}

    // *********** EDIT MOVIE MODAL EVENT LISTENER ************

    const myModal = document.getElementById('myModal')
    const myInput = document.getElementById('myInput')

    myModal.addEventListener('shown.bs.modal', () => {
        myInput.focus()
    })
// ************************************************************






