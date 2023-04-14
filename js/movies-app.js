"use strict";

    // ************ LOADER *******************
    $('body').append('<div style="" class="d-flex justify-content-center" id="loadingDiv" ><img id="loading-image" src="/img/loading.gif" alt="Loading..." /></div>');
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
                         <div class="card mx-auto px-2" style="width: 100%;" id="cardId">
                            <h5 class="card-title" id="movie-title">${movie.title}</h5>
                            <img src="${movie.poster}" class="card-img-top mx-auto" style="width: 80%; height: 80%" alt="...">
                                <div class="card-body">
                                    <p class="card-text" id="movie-dir"><b>Director:</b> ${movie.director}</p>
                                    <p class="card-text" id="movie-year"><b>Year:</b>  ${movie.year}</p>
                                    <div class="d-flex justify-content-evenly">
                                    <button type="button" class="edit btn" id="editBtn" style="color: white; background-color: darkslategray" data-bs-toggle="modal" data-bs-target="#myModal" onclick="popUpModal(${movie.id})">Edit</button>
                                    <button type="button" class="movieDetails btn" id="movieDetailsBtn" style="color: white; background-color: darkslategray" data-bs-toggle="modal" data-bs-target="#movieDetailsModal" onclick="movieDetailsModal(${movie.id})">Details</button>
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
            console.log(movieData.id)
            // movieData.title
            populateEditModal(movieData);

            document.getElementById("saveEdits").addEventListener("click", function (){
                // e.preventDefault();
                console.log("line 60: " + movieData.id)

                fetch(`http://localhost:3000/movies/${movieData.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(
                        {
                            id: movieData.id,
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

                $('#myModal').modal('hide');
                loadMovies();
            })
            document.getElementById("deleteMovie").addEventListener("click", function (){
                // e.preventDefault();
                deleteMovieById(movieData.id);
                $('#myModal').modal('hide');
                loadMovies();

            })
            document.getElementById("editCloseBtn").addEventListener("click", function (){
                clearEditModal(movieData);
                $('#myModal').modal('hide');

            })
        })
    }
// ***** POPULATES THE MODAL WITH PRESET MOVIE DATA VALUES TO BE EDITED.
function populateEditModal(movie){
    // console.log(movie.title)

    document.getElementById("movieTitle").textContent = "Your are editing: " + movie.title
    document.getElementById("userEditedTitle").value = movie.title
    document.getElementById("userEditedDir").value = movie.director
    document.getElementById("userEditedYear").value = movie.year
    document.getElementById("userEditedActors").value = movie.actors
    document.getElementById("userEditedPlot").value = movie.plot
    document.getElementById("userEditedGenre").value = movie.genre
    document.getElementById("userEditedRating").value = movie.rating
    document.getElementById("userEditedPoster").value = movie.poster
    }

// ************************************************************

function clearEditModal(movie){
    console.log("line 121 ID: " + movie.id)

    document.getElementById("userEditedTitle").value = ""
    document.getElementById("userEditedDir").value = ""
    document.getElementById("userEditedYear").value = ""
    document.getElementById("userEditedActors").value = ""
    document.getElementById("userEditedPlot").value = ""
    document.getElementById("userEditedGenre").value = ""
    document.getElementById("userEditedRating").value = ""
    document.getElementById("userEditedPoster").value = ""
}

// EDIT MOVIE

// function editMovieById(id){
//         fetch(`http://localhost:3000/movies/${id}`, {
//             method: "PATCH",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(
//                 {
//                     id: id,
//                     title: document.getElementById("userEditedTitle").value,
//                     director: document.getElementById("userEditedDir").value,
//                     year: document.getElementById("userEditedYear").value,
//                     actors: document.getElementById("userEditedActors").value,
//                     plot: document.getElementById("userEditedPlot").value,
//                     genre: document.getElementById("userEditedGenre").value,
//                     rating: document.getElementById("userEditedRating").value,
//                     poster: document.getElementById("userEditedPoster").value
//
//                 }
//                 )
//         })
//             .then(resp => resp.json())
//             .then(movieData => console.log(movieData))
//             .catch(error => console.error(error));
// }

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

    function clearAddMovieInputs(){
        document.getElementById("addMovieTitle").value = ""
        document.getElementById("addMovieDir").value = ""
        document.getElementById("addMovieYear").value = ""
        document.getElementById("addMovieActors").value = ""
        document.getElementById("addMoviePlot").value = ""
        document.getElementById("addMovieGenre").value = ""
        document.getElementById("addMovieRating").value = ""
        document.getElementById("addMoviePoster").value = ""

    }

document.getElementById("saveNewMovie").addEventListener("click", function (e){
    addNewMovie();
    clearAddMovieInputs();
    $('#addMovieModal').modal('hide');
    loadMovies();
})

document.getElementById("addMovieCloseBtn").addEventListener("click", function (){
    clearAddMovieInputs();
    $('#myModal').modal('hide');
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


//     ******** DELETE MOVIE *******
function deleteMovieById(id){
    fetch(`http://localhost:3000/movies/${id}`, {
        method: "DELETE",

    }).then(resp => resp.json())
        .then(data => {
            console.log(data)

        })
        .catch(error => console.error(error))
}

// function renderMovies(movie){
//     let moviesHTML = movie.map(movie =>{
//
//         return `<section class="d-flex col-12 col-sm-6 col-lg-4 col-xl-4 col-xxl-2 mx-auto mt-2">
//                          <div class="card mx-auto px-2" style="width: 100%;" id="cardId" data-id="${movie.id}">
//                             <h5 class="card-title" id="movie-title">${movie.title}</h5>
//                             <img src="${movie.poster}" class="card-img-top mx-auto" style="width: 80%; height: 80%" alt="...">
//                                 <div class="card-body">
//                                     <p class="card-text" id="movie-dir"><b>Director:</b> ${movie.director}</p>
//                                     <p class="card-text" id="movie-year"><b>Year:</b>  ${movie.year}</p>
//                                     <div class="d-flex justify-content-evenly">
//                                     <button type="button" class="edit btn" id="editBtn" style="color: white; background-color: darkslategray" data-bs-toggle="modal" data-bs-target="#myModal" onclick="popUpModal(${movie.id})">Edit</button>
//                                     <button type="button" class="movieDetails btn" id="movieDetailsBtn" style="color: white; background-color: darkslategray" data-bs-toggle="modal" data-bs-target="#movieDetailsModal" onclick="movieDetailsModal(${movie.id})">Details</button>
//                                     </div>
//                                 </div>
//                         </div>
//                         </section>`
//     })
//     document.getElementById("movie-cards").innerHTML=moviesHTML.join("");
//
// }
// function renderMovies(movies) {
//     var html = '';
//     // console.log(coffees)
//     for(var i = 0; i < movies.length; i++) {
//         html += renderMovie(movies[i]);
//     }
//     return html;
// }

// function updateMovieInput(e) {
//     e.preventDefault();
//     let movieUserInput = userInput.value.toLowerCase()
//     console.log(movieUserInput);
//     let movieHolic = [];
//     fetch("http://localhost:3000/movies")
//         .then(resp => resp.json())
//         .then(movieData => {
//             movieData.forEach(function (movie) {
//                 if (userInput.value === "") {
//                     // alert("you did non enter a movie title")
//                 } else if (movie.title.toLowerCase().includes(movieUserInput)) {
//                     movieHolic.push(movie);
//                 }
//
//             })
//         })
//
//     renderMovies(movieHolic);
//
// }
//
// let userInput = document.getElementById("userLocalSearch")
// userInput.addEventListener('click', updateMovieInput);


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
