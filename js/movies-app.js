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

                return `<section class="d-flex col-12 col-sm-6 col-lg-4 col-xl-4 col-xxl-2 mx-auto mt-2">
                         <div class="card mx-auto px-2" style="width: 100%;" id="cardId" data-id="${movie.id}">
                            <img src="${movie.poster}" class="card-img-top mx-auto" style="width: 80%; height: 80%" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title" id="movie-title">${movie.title}</h5>
                                    <p class="card-text" id="movie-dir"><b>Director:</b> ${movie.director}</p>
                                    <p class="card-text" id="movie-year"><b>Year:</b>  ${movie.year}</p>
                                    <div class="d-flex justify-content-evenly">
                                    <button type="button" class="edit" id="editBtn" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal" onclick="popUpModal(${movie.id})">Edit</button>
                                    <button type="button" class="movieDetails" id="movieDetailsBtn" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#movieDetailsModal" onclick="movieDetailsModal(${movie.id})">Details</button>
                                    </div>
                                </div>
                        </div>
                        </section>`
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
            // console.log(movieData.id)
            // movieData.title
            populateEditModal(movieData);

            document.getElementById("saveEdits").addEventListener("click", function (){
                // e.preventDefault();
                editMovieById(movieData.id);
                $('#myModal').modal('hide');
                loadMovies();
            })
        })
    }
// ***** POPULATES THE MODAL WITH PRESET MOVIE DATA VALUES TO BE EDITED.
function populateEditModal(movie){
    // console.log(movie.title)

    let currentTitle = document.getElementById("movieTitle").value = "You are Currently Editing" + movie.title
    let userEditedTitle = document.getElementById("userEditedTitle").value = movie.title
    let userEditedDir = document.getElementById("userEditedDir").value = movie.director
    let userEditedYear = document.getElementById("userEditedYear").value = movie.year
    let userEditedActors = document.getElementById("userEditedActors").value = movie.actors
    let userEditedPlot = document.getElementById("userEditedPlot").value = movie.plot
    let userEditedGenre = document.getElementById("userEditedGenre").value = movie.genre
    let userEditedRating = document.getElementById("userEditedRating").value = movie.rating
    let userEditedPoster = document.getElementById("userEditedPoster").value = movie.poster
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
                    rating: document.getElementById("userEditedRating").value,
                    poster: document.getElementById("userEditedPoster").value

                }
                )
        })
            .then(resp => resp.json())
            .then(movieData => console.log(movieData))
            .catch(error => console.error(error));
}

// ******** ADD NEW MOVIE ***************

function addNewMovie(){
    fetch(`http://localhost:3000/movies`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                title: document.getElementById("addMovieTitle").value,
                director: document.getElementById("addMovieDir").value,
                year: document.getElementById("addMovieYear").value,
                actors: document.getElementById("addMovieActors").value,
                plot: document.getElementById("addMoviePlot").value,
                genre: document.getElementById("addMovieGenre").value,
                rating: document.getElementById("addMovieRating").value,
                poster: document.getElementById("addMoviePoster").value
            }
        )
    })
        .then(resp => resp.json())
        .then(movieData => console.log(movieData))
        .catch(error => console.error(error));
}

document.getElementById("saveNewMovie").addEventListener("click", function (e){
    addNewMovie();
    $('#addMovieModal').modal('hide');
    loadMovies();
})

document.getElementById("flexSwitchCheckDefault").addEventListener("click",() =>{
    console.log("toggle switch clicked");
    imgSearchHideOrShow();
})

function imgSearchHideOrShow() {
    let x = document.getElementById("userImgSearchOnEdit");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

function movieDetailsModal(id) {
    fetch(`http://localhost:3000/movies/${id}`)
        .then(resp => resp.json())
        .then(movieData => {
            console.log(movieData.id)
            populateMovieDetails(movieData);
        })
    }

    function populateMovieDetails(movie){

        console.log(movie.title);

        document.getElementById("movieDetails-title").textContent = movie.title
        document.getElementById("movieDetails-dir").textContent = movie.director
        document.getElementById("movieDetails-year").textContent = movie.year
        document.getElementById("movieDetails-actors").textContent = movie.actors
        document.getElementById("movieDetails-plot").textContent = movie.plot
        document.getElementById("movieDetails-genre").textContent = movie.genre
       document.getElementById("movieDetails-rating").textContent = movie.rating

    }

//
// const options = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': 'eaf19d1d67msh2ddf4f7b0805fa3p15683fjsn816ec801716c',
//         'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
//     }
// };

//
//     function rapid(title) {
//         fetch(`https://online-movie-database.p.rapidapi.com/title/find?q=${title}`, options)
//             .then(response => response.json())
//             .then(response =>{
//                 console.log(response)
//                 console.log(response.results[0].title)
//
//
//
//             })
//             .catch(err => console.error(err));
//     }
//
// rapid("shrek")
