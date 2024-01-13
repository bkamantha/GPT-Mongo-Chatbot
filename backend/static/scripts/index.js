document.addEventListener("DOMContentLoaded", function () {
    fetch("/api/movies")
        .then((response) => response.json())
        .then((data) => {
            // Render movie cards
            renderMovieCards(data.movies);
        })
        .catch((error) => console.error("Error fetching movie data:", error));

    function renderMovieCards(movies) {
        const movieContainer = document.getElementById("movieContainer");

        movies.forEach((movie) => {
            const card = createMovieCard(movie);
            movieContainer.appendChild(card);
        });
    }

    function createMovieCard(movie) {
        const cardCol = document.createElement("div");
        cardCol.className = "col-md-5 mb-4"; // Adjust the column size based on your preference

        const card = document.createElement("div");
        card.className = "card h-100";

        const image = document.createElement("img");
        image.src = movie.poster;
        image.alt = movie.title;
        image.className = "card-img-top";
        image.style.width = "100%";
        image.style.height = "auto";

        // Handle broken images with a placeholder
        function handleImageError() {
            image.removeEventListener("error", handleImageError); // Remove the event listener after it's triggered
            image.src = "static/images/notFound.jpg"; // Replace with your placeholder image path
            image.alt = "Image not found";
        }

        image.addEventListener("error", handleImageError);

        const cardBody = document.createElement("div");
        cardBody.className = "card-body d-flex flex-column"; // Use flex-column to ensure proper alignment

        const title = document.createElement("h5");
        title.className = "card-title";
        title.textContent = movie.title;

        const plot = document.createElement("p");
        plot.className = "card-text";
        plot.textContent = movie.plot;

        const year = document.createElement("p");
        year.className = "card-text";
        year.textContent = `Year: ${movie.year}`;

        cardBody.appendChild(title);
        cardBody.appendChild(plot);
        cardBody.appendChild(year);

        card.appendChild(image);
        card.appendChild(cardBody);

        cardCol.appendChild(card);

        return cardCol;
    }

    // Chat icon click event
    const chatIcon = document.getElementById("chatIcon");
    const chatPopup = document.getElementById("chatPopup");
    const chatPopupContent = document.querySelector(".chat-popup-content");

    chatIcon.addEventListener("click", function () {
        // Fetch dynamic content from dialogwindow.html
        fetch("/dialog")
            .then((response) => response.text())
            .then((data) => {
                // Update the content of the chat popup
                chatPopupContent.innerHTML = data;

                // Display the chat popup
                chatPopup.style.display = "block";
            })
            .catch((error) => console.error("Error fetching dynamic content:", error));
    });

    // Function to close the chat popup
    window.closeChatPopup = function () {
        chatPopup.style.display = "none";
    };
});
