
fetch('2023.json')
.then((response) => {
    return response.json();
})
.then((data) => {
  document.getElementById("searchInput").style.display = "none";
    let div1 = document.getElementById("film");

    for (let i = data.length - 1; i >= 0; i--) {
        let div4 = document.createElement("div");
        div4.classList.add("display", "col-md-4");

        let div2 = document.createElement("img");
        div2.id = `imag${i}`;
        div2.src = data[i].thumbnail;
        div2.width = 200;
        div2.height = 250;

        div4.appendChild(div2);

        let info = document.createElement("div");
        info.classList.add("inf");
        info.style.width = "200px";

        let title = document.createElement("h4");
        title.classList.add("movie-title");
        title.innerHTML = data[i].title;

        info.appendChild(title);
        div4.appendChild(info);

        let statusDiv = document.createElement("div");
        statusDiv.classList.add("movie-status");

        // Check if movie is translated or untranslated
        if (!data[i].href || !data[i].href.startsWith("https")) {
            statusDiv.innerHTML = "Untranslated";
        } else {
            statusDiv.innerHTML = "Translated";
        }

        div4.appendChild(statusDiv);
        div1.prepend(div4);

        div4.addEventListener('mouseover', () => {
            div2.style.opacity = "0.5";
        });

        div4.addEventListener('mouseout', () => {
            div2.style.opacity = "1";
        });

      div4.addEventListener("click", () => {
        let popup = document.createElement("dialog");
        popup.id = "pop";
        let div3 = document.createElement("div");
        let imga = document.createElement("img");
        let description = document.createElement("p");
        let title = document.createElement("h3");
        imga.id = "popupimg";
        imga.src = data[i].thumbnail;
        imga.height = 150;
        imga.width = 100;
        description.style.color = "white";
        description.innerHTML = `${data[i].extract}`;
        title.style.color = "white";
        title.innerHTML = data[i].title;

        let titleDiv = document.createElement("div");
        titleDiv.appendChild(title);

        let cast = document.createElement("p");
        cast.classList.add("movie-cast");
        cast.innerHTML = `Cast: ${data[i].cast.join(", ")}`;

        let genreDiv = document.createElement("div");
        let genres = document.createElement("p");
        genres.classList.add("movie-genre");
        genres.innerHTML = `Genres: ${data[i].genres.join(", ")}`;
        genreDiv.appendChild(genres);

        let overviewDiv = document.createElement("div");
        overviewDiv.appendChild(description);

        div3.appendChild(titleDiv);
        div3.appendChild(overviewDiv);
        div3.appendChild(genreDiv);
        div3.appendChild(cast);

        let buttonsContainer = document.createElement("div");
        buttonsContainer.style.marginTop = "10px"; // Add top margin for spacing

        let video = document.createElement("video");
        video.src = data[i].href;
        video.controls = true;
        video.style.width = "100%";
        video.style.display = "none";
        div3.appendChild(video);

        if (!data[i].href || !data[i].href.startsWith("https")) {
          let untranslatedText = document.createElement("p");
          untranslatedText.textContent =
            "The translated version of this movie is not yet available but it will be available soon. At the moment, you may watch the untranslated movie.";
          untranslatedText.style.fontFamily = "Arial, sans-serif";
          untranslatedText.style.fontSize = "18px";
          untranslatedText.style.fontWeight = "bold";
          untranslatedText.style.fontStyle = "italic";
          untranslatedText.style.marginBottom = "10px";
          untranslatedText.style.color = "red";
          div3.appendChild(untranslatedText);

          let watchUntranslatedButton = document.createElement("button");
          watchUntranslatedButton.textContent = "Watch Untranslated Movie ▷";
          watchUntranslatedButton.classList.add("btn", "btn-secondary");
          watchUntranslatedButton.addEventListener("click", () => {
            window.location.href = "https://soaps.vercel.app";
          });
          buttonsContainer.appendChild(watchUntranslatedButton);
        } else {
          let watchButton = document.createElement("button");
          watchButton.textContent = "Watch Movie ▶️";
          watchButton.classList.add("btn", "btn-success");
          watchButton.style.marginRight = "10px"; // Add right margin for spacing
          watchButton.addEventListener("click", () => {
            video.style.display = "block";
          });
          buttonsContainer.appendChild(watchButton);

          let downloadButton = document.createElement("button");
          downloadButton.textContent = "Download Movie 📥";
          downloadButton.classList.add("btn", "btn-primary");
          downloadButton.addEventListener("click", () => {
            window.location.href = data[i].href;
          });
          buttonsContainer.appendChild(downloadButton);
        }

        div3.appendChild(buttonsContainer);

        let closeButton = document.createElement("button");
        closeButton.classList.add("btn", "btn-danger");
        closeButton.textContent = "Close ❌";
        closeButton.style.marginTop = "10px";
        closeButton.addEventListener("click", () => {
          popup.close();
        });

        div3.appendChild(closeButton);

        popup.appendChild(imga);
        popup.appendChild(div3);

        document.getElementsByTagName("body")[0].appendChild(popup);

        popup.showModal();
      });
    }
  
  // Declare filteredMovies outside the fetch block
  let filteredMovies = [];

// Function to search movies based on user input
function searchMovies() {
  const searchInput = document.getElementById("searchInput").value.trim().toLowerCase();

  // Fetch movies data from movies.json
  fetch("2023.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // Filter the movies based on the search input
      filteredMovies = data.filter((movie) => {
        return movie.title.toLowerCase().includes(searchInput);
      });

      // Clear the existing movie display
      const filmContainer = document.getElementById("film");
      filmContainer.innerHTML = "";


// If no movies match the search criteria, show a message
if (filteredMovies.length === 0) {
  const noResultsMessage = document.createElement("p");
  noResultsMessage.innerHTML = '<span style="color: purple">No movies found! Please make sure that the movie you are searching for was released between 2020-2023. To change the year,</span>  <span style="font-weight: bold; font-style: italic;"><a href="https://soaps.vercel.app">click here</a></span>';

  filmContainer.appendChild(noResultsMessage);
} else {
  // Generate the HTML elements for the filtered movies
  filteredMovies.forEach((movie, i) => {
    // Create the container div for each movie
    let movieContainer = document.createElement("div");
    movieContainer.classList.add("display", "col-md-4");


          // Create the movie thumbnail
          let thumbnail = document.createElement("img");
          thumbnail.id = `imag${i}`;
          thumbnail.src = movie.thumbnail;
          thumbnail.width = 200;
          thumbnail.height = 250;

          // Add a hover event listener to the thumbnail
          thumbnail.addEventListener("mouseover", () => {
            thumbnail.style.opacity = 0.8;
          });

          // Add a click event listener to the thumbnail
          thumbnail.addEventListener("click", () => {
            popupShowModal(movie);
          });

          // Append the thumbnail to the movie container
          movieContainer.appendChild(thumbnail);

          // Create the div for movie information
          let info = document.createElement("div");
          info.classList.add("info");

          // Create a heading for the movie title
          let titleHeading = document.createElement("h2");
          titleHeading.textContent = movie.title;

          // Add a click event listener to the movie title
          titleHeading.addEventListener("click", () => {
            popupShowModal(movie);
          });

          // Create a paragraph for the movie description
          let descriptionParagraph = document.createElement("p");
          descriptionParagraph.textContent = movie.description;

          // Append the title and description to the info div
          info.appendChild(titleHeading);
          info.appendChild(descriptionParagraph);

          // Append the info div to the movie container
          movieContainer.appendChild(info);

          // Create the div for movie status
          let statusDiv = document.createElement("div");
          statusDiv.classList.add("movie-status");

          // Check if the movie is translated or untranslated
          if (!movie.href || !movie.href.startsWith("https")) {
            statusDiv.innerHTML = "Untranslated";
          } else {
            statusDiv.innerHTML = "Translated";
          }

          // Append the status div to the movie container
          movieContainer.appendChild(statusDiv);

          // Append the movie container to the film container
          filmContainer.appendChild(movieContainer);
        });
      }
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    });
}

// Event listener for the search input
document.getElementById("searchInput").addEventListener("input", searchMovies);


  // Function to open a modal with movie details
  function popupShowModal(movie) {
    let popup = document.createElement("dialog");
    popup.id = "pop";

    let div3 = document.createElement("div");
    let imga = document.createElement("img");
    let title = document.createElement("h3");
    imga.id = "popupimg";
    imga.src = movie.thumbnail;
    imga.height = 150;
    imga.width = 100;

    title.style.color = "white";
    title.innerHTML = movie.title;

    let titleDiv = document.createElement("div");
    titleDiv.appendChild(title);

    let seasonInfo = document.createElement("p");
    seasonInfo.innerHTML = `Seasons: ${movie.seasons[0].seasonNumber}, Episodes: ${movie.seasons[0].episodeCount}`;

    let untranslatedInfo = document.createElement("p");
    untranslatedInfo.innerHTML = `Untranslated: ${movie.untranslated}`;

    div3.appendChild(titleDiv);
    div3.appendChild(seasonInfo);
    div3.appendChild(untranslatedInfo);

    let video = document.createElement("video");
    video.src = movie.href;
    video.controls = true;
    video.style.width = "100%";
    video.style.display = "block"; // Display the video by default

    div3.appendChild(video);

    let closeButton = document.createElement("button");
    closeButton.classList.add("btn", "btn-danger");
    closeButton.textContent = "Close ❌";
    closeButton.style.marginTop = "10px";
    closeButton.addEventListener("click", () => {
      popup.close();
    });

    div3.appendChild(closeButton);

    popup.appendChild(imga);
    popup.appendChild(div3);

    document.getElementsByTagName("body")[0].appendChild(popup);

    popup.showModal();
}
 
    // Pagination
    const fil = document.querySelector("#film").children;

    const prev = document.querySelector(".prev");
    const pages = document.querySelector(".page");
    const next = document.querySelector(".next");
    const maxitem = 12;
    let index = 1;
    const pagination = Math.ceil(fil.length / maxitem);

    prev.addEventListener("click", function () {
      index--;
      check();
      showitem();
    });

    next.addEventListener("click", function () {
      index++;
      check();
      showitem();
    });

    let check = () => {
      if (index == pagination) {
        next.classList.add("disabled");
      } else {
        next.classList.remove("disabled");
      }

      if (index == 1) {
        prev.classList.add("disabled");
      } else {
        prev.classList.remove("disabled");
      }
    };

    let showitem = () => {
      for (let p = 0; p < fil.length; p++) {
        fil[p].classList.remove("show");
        fil[p].classList.add("hide");

        if (p >= (index * maxitem) - maxitem && p < index * maxitem) {
          fil[p].classList.remove("hide");
          fil[p].classList.add("show");
        }
      }

        // Scroll to the top of the page
        document.getElementById("movie-list").scrollIntoView({
          behavior: "smooth",
          block: "start"
      });
      
      pages.innerHTML = index + "/" + pagination;
    };

    showitem();
    check();

    // Add genres to the filter list
    let filterList = document.querySelector("#filter ul");
    genresSet.forEach(genre => {
      let listItem = document.createElement("li");
      let input = document.createElement("input");
      input.type = "checkbox";
      input.onclick = () => myGenre(genre);
      let label = document.createElement("label");
      label.textContent = genre;

      listItem.appendChild(input);
      listItem.appendChild(label);
      filterList.appendChild(listItem);
    });
  })
  .catch((err) => {
    console.log(`error: ${err}`);
  });

let myGenre = (genre) => {
  const fil = document.querySelector("#film").children;

  for (let j = 0; j < fil.length; j++) {
    fil[j].classList.remove("show");
    fil[j].classList.add("hide");

    if (fil[j].querySelectorAll(".movie-genre").length > 0) {
      const movieGenres = Array.from(fil[j].querySelectorAll(".movie-genre")).map(genreElem => genreElem.textContent.toLowerCase());
      if (movieGenres.includes(genre.toLowerCase())) {
        fil[j].classList.remove("hide");
        fil[j].classList.add("show");
      }
    }
  }
};