// Admin credentials (will be replaced by developer)
const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "admin123"
};

// DOM Elements
const loginContainer = document.getElementById('login-container');
const adminDashboard = document.getElementById('admin-dashboard');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const logoutBtn = document.getElementById('logout-btn');
const menuItems = document.querySelectorAll('.menu-item');
const tabContents = document.querySelectorAll('.tab-content');
const addMovieForm = document.getElementById('add-movie-form');
const editMoviesTab = document.getElementById('edit-movies');
const adminMoviesList = document.getElementById('admin-movies-list');
const menuForm = document.getElementById('menu-form');
const addCastBtn = document.getElementById('add-cast-btn');
const castMembers = document.getElementById('cast-members');
const editMovieModal = document.getElementById('edit-movie-modal');
const editMovieForm = document.getElementById('edit-movie-form');
const closeEditModal = document.getElementById('close-edit-modal');
const editCastMembers = document.getElementById('edit-cast-members');
const editAddCastBtn = document.getElementById('edit-add-cast-btn');
const deleteMovieBtn = document.getElementById('delete-movie-btn');

// Movies data
let movies = [];
let currentEditMovieId = null;

// Initialize admin panel
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    setupEventListeners();
    loadMovies();
});

// Check if user is logged in
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (isLoggedIn === 'true') {
        showAdminDashboard();
    } else {
        showLoginScreen();
    }
}

// Setup event listeners
function setupEventListeners() {
    // Login form
    loginForm.addEventListener('submit', handleLogin);
    
    // Logout button
    logoutBtn.addEventListener('click', handleLogout);
    
    // Menu tabs
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            switchTab(this.dataset.tab);
        });
    });
    
    // Add movie form
    addMovieForm.addEventListener('submit', handleAddMovie);
    
    // Menu form
    menuForm.addEventListener('submit', handleSaveMenu);
    
    // Add cast member button
    addCastBtn.addEventListener('click', addCastMemberInput);
    
    // Edit movie modal
    closeEditModal.addEventListener('click', closeEditMovieModal);
    editMovieModal.addEventListener('click', function(e) {
        if (e.target === editMovieModal) {
            closeEditMovieModal();
        }
    });
    
    // Edit movie form
    editMovieForm.addEventListener('submit', handleEditMovie);
    
    // Delete movie button
    deleteMovieBtn.addEventListener('click', handleDeleteMovie);
    
    // Edit add cast member button
    editAddCastBtn.addEventListener('click', addEditCastMemberInput);
}

// Handle login
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        localStorage.setItem('adminLoggedIn', 'true');
        showAdminDashboard();
    } else {
        loginError.textContent = 'Invalid username or password';
        loginError.style.display = 'block';
    }
}

// Handle logout
function handleLogout() {
    localStorage.removeItem('adminLoggedIn');
    showLoginScreen();
}

// Show login screen
function showLoginScreen() {
    loginContainer.style.display = 'flex';
    adminDashboard.style.display = 'none';
    loginForm.reset();
    loginError.style.display = 'none';
}

// Show admin dashboard
function showAdminDashboard() {
    loginContainer.style.display = 'none';
    adminDashboard.style.display = 'block';
}

// Switch between tabs
function switchTab(tabId) {
    // Update active menu item
    menuItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.tab === tabId) {
            item.classList.add('active');
        }
    });
    
    // Show active tab content
    tabContents.forEach(tab => {
        tab.classList.remove('active');
        if (tab.id === tabId) {
            tab.classList.add('active');
        }
    });
    
    // Load movies if on edit movies tab
    if (tabId === 'edit-movies') {
        loadAdminMoviesList();
    }
}

// Load movies from localStorage
function loadMovies() {
    const storedMovies = localStorage.getItem('movies');
    if (storedMovies) {
        movies = JSON.parse(storedMovies);
    }
}

// Handle add movie form submission
function handleAddMovie(e) {
    e.preventDefault();
    
    // Get form values
    const title = document.getElementById('movie-title').value;
    const category = document.getElementById('movie-category').value;
    const year = document.getElementById('movie-year').value;
    const poster = document.getElementById('movie-poster').value;
    const description = document.getElementById('movie-description').value;
    const watchLink = document.getElementById('movie-watch-link').value;
    
    // Get cast members
    const cast = [];
    const castInputs = document.querySelectorAll('#cast-members .cast-member-input');
    castInputs.forEach(input => {
        const name = input.querySelector('.cast-name').value;
        const photo = input.querySelector('.cast-photo').value;
        if (name && photo) {
            cast.push({ name, photo });
        }
    });
    
    // Create new movie object
    const newMovie = {
        id: Date.now(), // Simple ID generation
        title,
        category,
        year,
        poster,
        description,
        watchLink,
        cast
    };
    
    // Add to movies array
    movies.push(newMovie);
    
    // Save to localStorage
    localStorage.setItem('movies', JSON.stringify(movies));
    
    // Reset form
    addMovieForm.reset();
    
    // Reset cast members
    castMembers.innerHTML = '';
    addCastMemberInput();
    
    // Show success message (you could add a toast notification here)
    alert('Movie added successfully!');
}

// Add cast member input field
function addCastMemberInput() {
    const castMemberDiv = document.createElement('div');
    castMemberDiv.className = 'cast-member-input';
    castMemberDiv.innerHTML = `
        <input type="text" class="cast-name" placeholder="Actor Name" required>
        <input type="text" class="cast-photo" placeholder="Photo URL" required>
        <button type="button" class="remove-cast-btn">Remove</button>
    `;
    
    castMembers.appendChild(castMemberDiv);
    
    // Add event listener to remove button
    const removeBtn = castMemberDiv.querySelector('.remove-cast-btn');
    removeBtn.addEventListener('click', function() {
        if (document.querySelectorAll('#cast-members .cast-member-input').length > 1) {
            castMemberDiv.remove();
        }
    });
}

// Add edit cast member input field
function addEditCastMemberInput() {
    const castMemberDiv = document.createElement('div');
    castMemberDiv.className = 'cast-member-input';
    castMemberDiv.innerHTML = `
        <input type="text" class="cast-name" placeholder="Actor Name" required>
        <input type="text" class="cast-photo" placeholder="Photo URL" required>
        <button type="button" class="remove-cast-btn">Remove</button>
    `;
    
    editCastMembers.appendChild(castMemberDiv);
    
    // Add event listener to remove button
    const removeBtn = castMemberDiv.querySelector('.remove-cast-btn');
    removeBtn.addEventListener('click', function() {
        if (document.querySelectorAll('#edit-cast-members .cast-member-input').length > 1) {
            castMemberDiv.remove();
        }
    });
}

// Load admin movies list
function loadAdminMoviesList() {
    adminMoviesList.innerHTML = '';
    
    if (movies.length === 0) {
        adminMoviesList.innerHTML = '<p>No movies added yet.</p>';
        return;
    }
    
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'admin-movie-card';
        movieCard.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}" class="admin-movie-poster">
            <div class="admin-movie-info">
                <h4 class="admin-movie-title">${movie.title}</h4>
                <div class="admin-movie-meta">
                    <span>${movie.year}</span>
                    <span>${movie.category}</span>
                </div>
                <button class="edit-movie-btn" data-id="${movie.id}">Edit Movie</button>
            </div>
        `;
        
        adminMoviesList.appendChild(movieCard);
    });
    
    // Add event listeners to edit buttons
    document.querySelectorAll('.edit-movie-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            openEditMovieModal(parseInt(this.dataset.id));
        });
    });
}

// Open edit movie modal
function openEditMovieModal(movieId) {
    const movie = movies.find(m => m.id === movieId);
    if (!movie) return;
    
    currentEditMovieId = movieId;
    
    // Fill form with movie data
    document.getElementById('edit-movie-id').value = movie.id;
    document.getElementById('edit-movie-title').value = movie.title;
    document.getElementById('edit-movie-category').value = movie.category;
    document.getElementById('edit-movie-year').value = movie.year;
    document.getElementById('edit-movie-poster').value = movie.poster;
    document.getElementById('edit-movie-description').value = movie.description;
    document.getElementById('edit-movie-watch-link').value = movie.watchLink;
    
    // Fill cast members
    editCastMembers.innerHTML = '';
    movie.cast.forEach(actor => {
        addEditCastMemberInput();
        const lastInput = editCastMembers.lastElementChild;
        lastInput.querySelector('.cast-name').value = actor.name;
        lastInput.querySelector('.cast-photo').value = actor.photo;
    });
    
    // Show modal
    editMovieModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close edit movie modal
function closeEditMovieModal() {
    editMovieModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    currentEditMovieId = null;
}

// Handle edit movie form submission
function handleEditMovie(e) {
    e.preventDefault();
    
    if (!currentEditMovieId) return;
    
    // Get form values
    const title = document.getElementById('edit-movie-title').value;
    const category = document.getElementById('edit-movie-category').value;
    const year = document.getElementById('edit-movie-year').value;
    const poster = document.getElementById('edit-movie-poster').value;
    const description = document.getElementById('edit-movie-description').value;
    const watchLink = document.getElementById('edit-movie-watch-link').value;
    
    // Get cast members
    const cast = [];
    const castInputs = document.querySelectorAll('#edit-cast-members .cast-member-input');
    castInputs.forEach(input => {
        const name = input.querySelector('.cast-name').value;
        const photo = input.querySelector('.cast-photo').value;
        if (name && photo) {
            cast.push({ name, photo });
        }
    });
    
    // Find and update movie
    const movieIndex = movies.findIndex(m => m.id === currentEditMovieId);
    if (movieIndex !== -1) {
        movies[movieIndex] = {
            ...movies[movieIndex],
            title,
            category,
            year,
            poster,
            description,
            watchLink,
            cast
        };
        
        // Save to localStorage
        localStorage.setItem('movies', JSON.stringify(movies));
        
        // Close modal and reload list
        closeEditMovieModal();
        loadAdminMoviesList();
        
        // Show success message
        alert('Movie updated successfully!');
    }
}

// Handle delete movie
function handleDeleteMovie() {
    if (!currentEditMovieId) return;
    
    if (confirm('Are you sure you want to delete this movie?')) {
        // Remove movie from array
        movies = movies.filter(m => m.id !== currentEditMovieId);
        
        // Save to localStorage
        localStorage.setItem('movies', JSON.stringify(movies));
        
        // Close modal and reload list
        closeEditMovieModal();
        loadAdminMoviesList();
        
        // Show success message
        alert('Movie deleted successfully!');
    }
}

// Handle save menu
function handleSaveMenu(e) {
    e.preventDefault();
    
    const menuItems = document.getElementById('menu-items').value;
    
    // In a real application, you would save this to localStorage or a database
    // For this demo, we'll just show a success message
    alert('Menu saved successfully!');
}

// Initialize with one cast member input
addCastMemberInput();