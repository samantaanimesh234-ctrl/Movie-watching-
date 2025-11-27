// Movie data structure
let movies = [];

// DOM Elements
const featuredMoviesGrid = document.getElementById('featured-movies');
const hollywoodMoviesGrid = document.getElementById('hollywood-movies');
const bollywoodMoviesGrid = document.getElementById('bollywood-movies');
const southIndianMoviesGrid = document.getElementById('south-indian-movies');
const movieModal = document.getElementById('movie-modal');
const modalBody = document.getElementById('modal-body');
const closeModalBtn = document.getElementById('close-modal');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadMovies();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Close modal when clicking X
    closeModalBtn.addEventListener('click', closeMovieModal);
    
    // Close modal when clicking outside
    movieModal.addEventListener('click', function(e) {
        if (e.target === movieModal) {
            closeMovieModal();
        }
    });
    
    // Hamburger menu toggle
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Toggle mobile menu
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Load movies from localStorage
function loadMovies() {
    const storedMovies = localStorage.getItem('movies');
    if (storedMovies) {
        movies = JSON.parse(storedMovies);
        displayMovies();
    } else {
        // Add some sample movies if none exist
        addSampleMovies();
    }
}

// Add sample movies for initial display
function addSampleMovies() {
    movies = [
        {
            id: 1,
            title: "The Dark Knight",
            category: "hollywood",
            year: "2008",
            description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
            poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            watchLink: "#",
            cast: [
                { name: "Christian Bale", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" },
                { name: "Heath Ledger", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" },
                { name: "Aaron Eckhart", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" }
            ]
        },
        {
            id: 2,
            title: "Dangal",
            category: "bollywood",
            year: "2016",
            description: "Former wrestler Mahavir Singh Phogat trains his daughters Geeta and Babita to become India's first world-class female wrestlers.",
            poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            watchLink: "#",
            cast: [
                { name: "Aamir Khan", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" },
                { name: "Sakshi Tanwar", photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" },
                { name: "Fatima Sana Shaikh", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" }
            ]
        },
        {
            id: 3,
            title: "Baahubali: The Beginning",
            category: "south-indian",
            year: "2015",
            description: "In ancient India, an adventurous and daring man becomes involved in a decades-old feud between two warring peoples.",
            poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            watchLink: "#",
            cast: [
                { name: "Prabhas", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" },
                { name: "Rana Daggubati", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" },
                { name: "Anushka Shetty", photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" }
            ]
        }
    ];
    
    // Save to localStorage
    localStorage.setItem('movies', JSON.stringify(movies));
    displayMovies();
}

// Display movies in their respective sections
function displayMovies() {
    // Clear all grids
    featuredMoviesGrid.innerHTML = '';
    hollywoodMoviesGrid.innerHTML = '';
    bollywoodMoviesGrid.innerHTML = '';
    southIndianMoviesGrid.innerHTML = '';
    
    // Add movies to their respective categories
    movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        
        // Add to featured if it's one of the first 3 movies
        if (movie.id <= 3) {
            featuredMoviesGrid.appendChild(movieCard.cloneNode(true));
        }
        
        // Add to category-specific section
        switch(movie.category) {
            case 'hollywood':
                hollywoodMoviesGrid.appendChild(movieCard);
                break;
            case 'bollywood':
                bollywoodMoviesGrid.appendChild(movieCard);
                break;
            case 'south-indian':
                southIndianMoviesGrid.appendChild(movieCard);
                break;
        }
    });
}

// Create a movie card element
function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.setAttribute('data-id', movie.id);
    
    card.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
        <div class="movie-info">
            <h3 class="movie-title">${movie.title}</h3>
            <p class="movie-year">${movie.year}</p>
        </div>
    `;
    
    card.addEventListener('click', () => openMovieModal(movie.id));
    
    return card;
}

// Open movie details modal
function openMovieModal(movieId) {
    const movie = movies.find(m => m.id === movieId);
    if (!movie) return;
    
    modalBody.innerHTML = `
        <div class="movie-details">
            <div class="movie-details-poster">
                <img src="${movie.poster}" alt="${movie.title}">
            </div>
            <div class="movie-details-content">
                <h2 class="movie-details-title">${movie.title}</h2>
                <div class="movie-details-meta">
                    <span>${movie.year}</span>
                    <span>${movie.category.charAt(0).toUpperCase() + movie.category.slice(1)}</span>
                </div>
                <p class="movie-details-description">${movie.description}</p>
                
                <div class="movie-details-cast">
                    <h3 class="cast-title">Cast</h3>
                    <div class="cast-grid">
                        ${movie.cast.map(actor => `
                            <div class="cast-member">
                                <img src="${actor.photo}" alt="${actor.name}" class="cast-photo">
                                <p class="cast-name">${actor.name}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <a href="${movie.watchLink}" class="watch-btn" target="_blank">Watch Now</a>
            </div>
        </div>
    `;
    
    movieModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close movie details modal
function closeMovieModal() {
    movieModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}