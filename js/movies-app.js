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

// *********** POPULATING MOVIE CARDS ON HTML **************
function loadMovies() {
    fetch("http://localhost:3000/movies")
        .then(resp => resp.json())
        .then(movieData => {
            // console.log(movieData)
           let moviesHTML = movieData.map(movie =>{

                return `<div class="card" style="width: 18rem;" id="cardId" data-id="${movie.id}">
                            <img src="${movie.poster}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title" id="movie-title">${movie.title}</h5>
                                <p class="card-text" id="movie-plot">${movie.plot}</p>
                                <button type="button" class="edit" id="editBtn" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal" onclick="popUpModal(${movie.id})">Edit</button>
                            </div>
                        </div>`
            })
            document.getElementById("movie-cards").innerHTML=moviesHTML.join("");

        })
        .catch(error => {console.error(error)}
        );
}

// *********** WHEN EDIT BTN IS THIS FUNCTION IS TRIGGERED AND popUpModal FUNCTION IS CALLED ************

function popUpModal(id) {
    fetch(`http://localhost:3000/movies/${id}`)
        .then(resp => resp.json())
        .then(movieData => {
            console.log(movieData.id)
            // movieData.title
            populateEditModal(movieData);

            document.getElementById("saveEdits").addEventListener("click", function (e){
                e.preventDefault();
                editMovieById(movieData.id);
                $('#myModal').modal('hide');
            })
        })
    }
// ***** POPULATES THE MODAL WITH PRESET MOVIE DATA VALUES TO BE EDITED.
function populateEditModal(movie){
    console.log(movie.title)

    let currentTitle = document.getElementById("movieTitle").value = "You are Currently Editing" + movie.title
    let userEditedTitle = document.getElementById("userEditedTitle").value = movie.title
    let userEditedDir = document.getElementById("userEditedDir").value = movie.director
    let userEditedYear = document.getElementById("userEditedYear").value = movie.year
    let userEditedActors = document.getElementById("userEditedActors").value = movie.actors
    let userEditedPlot = document.getElementById("userEditedPlot").value = movie.plot
    let userEditedGenre = document.getElementById("userEditedGenre").value = movie.genre
    let userEditedRating = document.getElementById("userEditedRating").value = movie.rating
    }

// ************************************************************

// EDIT MOVIE

function editMovieById(id){
        fetch(`http://localhost:3000/movies/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    title: document.getElementById("userEditedTitle").value,
                    director: document.getElementById("userEditedDir").value,
                    year: document.getElementById("userEditedYear").value,
                    actors: document.getElementById("userEditedActors").value,
                    plot: document.getElementById("userEditedPlot").value,
                    genre: document.getElementById("userEditedGenre").value,
                    rating: document.getElementById("userEditedRating").value
                }
                )
        })
            .then(resp => resp.json())
            .then(movieData => console.log(movieData))
            .catch(error => console.error(error));
}







