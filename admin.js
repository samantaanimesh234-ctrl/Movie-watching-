// Add these variables at the top with other DOM elements
const posterUpload = document.getElementById('poster-upload');
const posterPreview = document.getElementById('poster-preview');

// Add to setupEventListeners()
posterUpload.addEventListener('change', handlePosterUpload);

// File Upload Handlers
function handlePosterUpload(e) {
    const file = e.target.files[0];
    if (file) {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                // Convert to Base64 for localStorage storage
                const base64Image = e.target.result;
                posterPreview.innerHTML = `<img src="${base64Image}" alt="Poster Preview">`;
                
                // Also populate the URL field with Base64 data
                document.getElementById('movie-poster').value = base64Image;
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select a valid image file.');
            e.target.value = '';
        }
    }
}

// Updated addCastMemberInput function
function addCastMemberInput() {
    const castMemberDiv = document.createElement('div');
    castMemberDiv.className = 'cast-member-input';
    castMemberDiv.innerHTML = `
        <input type="text" class="cast-name" placeholder="Actor Name" required>
        <input type="text" class="cast-photo" placeholder="Or enter photo URL">
        <input type="file" class="cast-photo-upload" accept="image/*">
        <div class="image-preview small-preview">
            <div class="preview-placeholder">Photo preview</div>
        </div>
        <button type="button" class="remove-cast-btn">Remove</button>
    `;
    
    castMembers.appendChild(castMemberDiv);
    
    // Add event listeners
    const removeBtn = castMemberDiv.querySelector('.remove-cast-btn');
    const photoUpload = castMemberDiv.querySelector('.cast-photo-upload');
    const photoUrlInput = castMemberDiv.querySelector('.cast-photo');
    const preview = castMemberDiv.querySelector('.image-preview');
    
    removeBtn.addEventListener('click', function() {
        if (document.querySelectorAll('#cast-members .cast-member-input').length > 1) {
            castMemberDiv.remove();
        }
    });
    
    photoUpload.addEventListener('change', function(e) {
        handleCastPhotoUpload(e, photoUrlInput, preview);
    });
    
    // Update preview when URL is entered
    photoUrlInput.addEventListener('input', function() {
        if (this.value) {
            preview.innerHTML = `<img src="${this.value}" alt="Cast Preview" onerror="this.style.display='none'">`;
        } else {
            preview.innerHTML = '<div class="preview-placeholder">Photo preview</div>';
        }
    });
}

// Handle cast photo upload
function handleCastPhotoUpload(e, urlInput, preview) {
    const file = e.target.files[0];
    if (file) {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const base64Image = e.target.result;
                preview.innerHTML = `<img src="${base64Image}" alt="Cast Preview">`;
                urlInput.value = base64Image;
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select a valid image file.');
            e.target.value = '';
        }
    }
}

// Updated addEditCastMemberInput function
function addEditCastMemberInput() {
    const castMemberDiv = document.createElement('div');
    castMemberDiv.className = 'cast-member-input';
    castMemberDiv.innerHTML = `
        <input type="text" class="cast-name" placeholder="Actor Name" required>
        <input type="text" class="cast-photo" placeholder="Or enter photo URL">
        <input type="file" class="cast-photo-upload" accept="image/*">
        <div class="image-preview small-preview">
            <div class="preview-placeholder">Photo preview</div>
        </div>
        <button type="button" class="remove-cast-btn">Remove</button>
    `;
    
    editCastMembers.appendChild(castMemberDiv);
    
    // Add event listeners
    const removeBtn = castMemberDiv.querySelector('.remove-cast-btn');
    const photoUpload = castMemberDiv.querySelector('.cast-photo-upload');
    const photoUrlInput = castMemberDiv.querySelector('.cast-photo');
    const preview = castMemberDiv.querySelector('.image-preview');
    
    removeBtn.addEventListener('click', function() {
        if (document.querySelectorAll('#edit-cast-members .cast-member-input').length > 1) {
            castMemberDiv.remove();
        }
    });
    
    photoUpload.addEventListener('change', function(e) {
        handleCastPhotoUpload(e, photoUrlInput, preview);
    });
    
    photoUrlInput.addEventListener('input', function() {
        if (this.value) {
            preview.innerHTML = `<img src="${this.value}" alt="Cast Preview" onerror="this.style.display='none'">`;
        } else {
            preview.innerHTML = '<div class="preview-placeholder">Photo preview</div>';
        }
    });
}

// Updated openEditMovieModal function
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
    
    // Show poster preview
    if (movie.poster) {
        posterPreview.innerHTML = `<img src="${movie.poster}" alt="Poster Preview">`;
    }
    
    // Fill cast members
    editCastMembers.innerHTML = '';
    movie.cast.forEach(actor => {
        addEditCastMemberInput();
        const lastInput = editCastMembers.lastElementChild;
        lastInput.querySelector('.cast-name').value = actor.name;
        lastInput.querySelector('.cast-photo').value = actor.photo;
        
        // Show cast photo preview
        if (actor.photo) {
            const preview = lastInput.querySelector('.image-preview');
            preview.innerHTML = `<img src="${actor.photo}" alt="Cast Preview">`;
        }
    });
    
    // Show modal
    editMovieModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Add form reset functionality
function resetAddMovieForm() {
    addMovieForm.reset();
    castMembers.innerHTML = '';
    posterPreview.innerHTML = '<div class="preview-placeholder">Poster preview will appear here</div>';
    addCastMemberInput();
}

// Update handleAddMovie to reset form properly
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
    
    // Validate required fields
    if (!title || !category || !year || !poster || !description || !watchLink || cast.length === 0) {
        alert('Please fill all required fields and add at least one cast member.');
        return;
    }
    
    // Create new movie object
    const newMovie = {
        id: Date.now(),
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
    resetAddMovieForm();
    
    // Show success message
    alert('Movie added successfully!');
}

// Initialize with proper preview placeholders
document.addEventListener('DOMContentLoaded', function() {
    // Set initial preview placeholders
    posterPreview.innerHTML = '<div class="preview-placeholder">Poster preview will appear here</div>';
});
