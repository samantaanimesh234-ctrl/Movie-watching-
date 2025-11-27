// Initialize empty array if localstorage is empty
if (!localStorage.getItem('moviesData')) {
    localStorage.setItem('moviesData', JSON.stringify([]));
}

const movieContainer = document.getElementById('movieContainer');
const modal = document.getElementById('movieModal');
const searchInput = document.getElementById('searchInput');

// Load Movies on Page Load
window.onload = () => {
    displayMovies(JSON.parse(localStorage.getItem('moviesData')));
};

// Function to Display Movies
function displayMovies(movies) {
    movieContainer.innerHTML = '';
    if(movies.length === 0) {
        movieContainer.innerHTML = '<p>No movies found. Please add movies from Admin Panel.</p>';
        return;
    }

    movies.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('movie-card');
        card.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}">
            <div class="card-info">
                <h3>${movie.title}</h3>
                <span class="category">${movie.category}</span>
            </div>
        `;
        card.onclick = () => openModal(movie);
        movieContainer.appendChild(card);
    });
}

// Open Movie Detail Modal
function openModal(movie) {
    document.getElementById('modalImg').src = movie.poster;
    document.getElementById('modalTitle').innerText = movie.title;
    document.getElementById('modalCategory').innerText = movie.category;
    document.getElementById('modalDesc').innerText = movie.description;
    document.getElementById('watchLink').href = movie.link;

    // Render Cast
    const castContainer = document.getElementById('modalCast');
    castContainer.innerHTML = '';
    movie.cast.forEach(actor => {
        const div = document.createElement('div');
        div.classList.add('cast-member');
        div.innerHTML = `
            <img src="${actor.photo}" alt="${actor.name}">
            <span>${actor.name}</span>
        `;
        castContainer.appendChild(div);
    });

    modal.style.display = "block";
}

// Close Modal
document.querySelector('.close-btn').onclick = () => {
    modal.style.display = "none";
}

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Filter Movies
function filterMovies(category) {
    const allMovies = JSON.parse(localStorage.getItem('moviesData'));
    document.querySelectorAll('.nav-links li').forEach(li => li.classList.remove('active'));
    event.target.classList.add('active');

    if (category === 'all') {
        displayMovies(allMovies);
    } else {
        const filtered = allMovies.filter(m => m.category === category);
        displayMovies(filtered);
    }
}

// Search Functionality
searchInput.addEventListener('input', (e) => {
    const val = e.target.value.toLowerCase();
    const allMovies = JSON.parse(localStorage.getItem('moviesData'));
    const filtered = allMovies.filter(m => m.title.toLowerCase().includes(val));
    displayMovies(filtered);
});
