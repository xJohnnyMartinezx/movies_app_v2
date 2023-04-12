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
            // console.log(movieData)
           let moviesHTML = movieData.map(movie =>{
                // language = html;
                return `<div class="card" style="width: 18rem;">
                        <img src="${movie.poster}" class="card-img-top" alt="...">
                        <div class="card-body">
                        <h5 class="card-title" id="movie-title">${movie.title}</h5>
                        <p class="card-text" id="movie-plot">${movie.plot}</p>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal" onclick="populateEditModal(${movie.id})">Edit</button>
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


    //
    // const myModal = document.getElementById('myModal')
    // const userEditedTitle = document.getElementById('userEditedTitle')
    // const userEditedDir = document.getElementById('userEditedDir')
    // const userEditedYear = document.getElementById('userEditedYear')
    //
    //
    // myModal.addEventListener('shown.bs.modal', () => {
    //     userEditedTitle.focus()
    //     userEditedDir.focus()
    //     userEditedYear.focus()
    // })

function populateEditModal(id) {
    fetch(`http://localhost:3000/movies/${id}`)
        .then(resp => resp.json())
        .then(movieData => {
            console.log(movieData)
            let editMoviesHTML = [movieData].map(movie => {
                // console.log(movie.title);
                return popUpModal(movie)
            })
            document.getElementById("myModal").innerHTML=editMoviesHTML;
        })

}

// const myModal = document.getElementById('myModal')
// const myInput = document.getElementById('myInput')
// const userEditedDir = document.getElementById('userEditedDir')
// const userEditedYear = document.getElementById('userEditedYear')


// myModal.addEventListener('shown.bs.modal', () => {
//     myInput.focus()
//     // userEditedDir.focus()
//     // userEditedYear.focus()
// })

function popUpModal(movie){
    console.log(movie.title)
    return `<!-- <div class="modal" id="myModal" tabIndex="-1">-->
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${movie.title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <label for="userEditedTitle" class="form-label" style="color: black">Title</label>
                <input id="userEditedTitle" type="text" placeholder="${movie.title}">
                <label for="userEditedDir" class="form-label" style="color: black">Director</label>
                <input id="userEditedDir" type="text" placeholder="${movie.director}">
                <label for="userEditedYear" class="form-label" style="color: black">Year</label>
                <input id="userEditedYear" type="text" placeholder="${movie.year}">
                </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
            </div>
        </div>
<!--    </div>-->`
}

// ************************************************************

// EDIT MOVIE

// function editMovieById(id){
//         fetch(`http://localhost:3000/movies/${id}`, {
//             method: "PATCH",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify()
//         })
//             .then(resp => resp.json())
//             .then(movieData => console.log(movieData))
//             .catch(error => console.error(error));
// }

// function editMovieProperties();




