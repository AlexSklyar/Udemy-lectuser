// const addMovieModal = document.querySelector('#add-modal');
// const addMovieModal = document.body.children[1];
// const startAddMovieButton = document.querySelector('header').lastElementChild;
// const userInputs = addMovieModal.getElementsByTagName('input');
// const backdrop = document.body.firstElementChild('backdrop');

const addMovieModal = document.getElementById('add-modal');
const startAddMovieButton = document.querySelector('header button')
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const cofirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const backdrop = document.getElementById('backdrop');
const entryTextSection = document.getElementById('entry-text');
const deleteMovieModale = document.getElementById('delete-modal');
const movies = [];

const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
};

const updateUI = () => {
    if (entryTextSection === 0) {
        entryTextSection.style.display = 'block';
    } else {
        entryTextSection.style.display = 'none';
    }
};

const closeMovieDeletionModal = () => {
    toggleBackdrop();
    deleteMovieModale.classList.remove('visible');
};
const deleteMovieHandler = (movieId) => {
    let movieIndex = 0;
    for (const movie of movies) {
        if (movie.id === movieId) {
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    const listRoot = document.getElementById('movie-list');
    listRoot.children[movieIndex].remove();
    // listRoot.removeChild(listRoot.children[movieIndex]);

    closeMovieDeletionModal();
    updateUI();
};



const startDeleteMovieHandler = (movieId) => {
    deleteMovieModale.classList.add('visible');
    toggleBackdrop();

    const cancelDeletionButton = deleteMovieModale.querySelector('.btn--passive');
    let confirmDeletionButton = deleteMovieModale.querySelector('.btn--danger');

    confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));
    
    confirmDeletionButton = deleteMovieModale.querySelector('.btn--danger');
    // confirmDeletionButton.removeEventListener('click', deleteMovieHandler.bind(null, movieId)); // will not work
    cancelDeletionButton.removeEventListener('click', closeMovieDeletionModal);

    cancelDeletionButton.addEventListener('click', closeMovieDeletionModal);
    confirmDeletionButton.addEventListener('click', deleteMovieHandler.bind(null, movieId));

    // deleteMovie(movieId);
};
const renderNewMovieElement = (id, title, imageUrl, rating) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
    <div class="movie-element__image">
    <img src="${imageUrl}" alt="${title}"/>
    </div>
    <div class='movie-element__info'>
    <h2>${title}</h2>
    <p>${rating}/5 stars</p>
    </div>
    `;
    newMovieElement.addEventListener('click', startDeleteMovieHandler.bind(null, id));
    const listRoot = document.getElementById('movie-list');
    listRoot.append(newMovieElement);

};

const clearMovieInputs = () => {
    for (const userInput of userInputs) {
    userInput.value = '';
}
    // userInputs[0].value = '';
};



const closeMovieModal = () => {
    addMovieModal.classList.remove('visible');
};

const showMovieModal = () => {
    addMovieModal.classList.add('visible');
    toggleBackdrop();
};

const cancelAddMovieHandler = () => {
    closeMovieModal();
    toggleBackdrop();
    clearMovieInputs();
};

const addMovieHandler = () => {
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;
    if (titleValue.trim() === '' ||
        imageUrlValue.trim() === '' ||
        ratingValue.trim() === '' || 
        +ratingValue < 1 ||
        +ratingValue > 5
    )
    {
        alert('pla enter valid  valuues (rating between 1 and 5).');
        return;
    }
    const newMovie = {
        id: Math.random().toString(),
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue
    };
    movies.push(newMovie);
    console.log(movies);
    closeMovieModal();
    toggleBackdrop();
    clearMovieInputs();
    renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
    updateUI();
};

const backdropClickHandler = () => {
    closeMovieModal();
    closeMovieDeletionModal();
    clearMovieInputs();
};

startAddMovieButton.addEventListener('click', showMovieModal)
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
cofirmAddMovieButton.addEventListener('click', addMovieHandler)
// console.log(startAddMovieButton)