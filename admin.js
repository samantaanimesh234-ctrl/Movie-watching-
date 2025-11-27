// Check Session on Load
if(localStorage.getItem('adminLoggedIn') === 'true') {
    showDashboard();
}

// ----------------- AUTHENTICATION -----------------
function adminLogin() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    // ⚠ REPLACE THESE CREDENTIALS MANUALLY ⚠
    const validUser = "admin";
    const validPass = "admin123";

    if (user === validUser && pass === validPass) {
        localStorage.setItem('adminLoggedIn', 'true');
        showDashboard();
    } else {
        document.getElementById('errorMsg').style.display = 'block';
    }
}

function adminLogout() {
    localStorage.removeItem('adminLoggedIn');
    location.reload();
}

function showDashboard() {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('dashboard-section').style.display = 'block';
    loadMoviesTable();
}

// ----------------- CRUD OPERATIONS -----------------

// Helper: Convert Image to Base64
const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

async function saveMovie() {
    const id = document.getElementById('movieId').value;
    const title = document.getElementById('mTitle').value;
    const category = document.getElementById('mCategory').value;
    const desc = document.getElementById('mDesc').value;
    const link = document.getElementById('mLink').value;
    
    // Files
    const posterFile = document.getElementById('mPoster').files[0];
    const cast1File = document.getElementById('castImg1').files[0];
    const cast2File = document.getElementById('castImg2').files[0];

    if (!title || !link) {
        alert("Title and Watch Link are required!");
        return;
    }

    let movies = JSON.parse(localStorage.getItem('moviesData')) || [];
    let movieObj = {};

    // Determine if Edit or New
    if (id) {
        // Edit Mode: Find existing
        movieObj = movies.find(m => m.id == id);
    } else {
        // New Mode
        movieObj = { id: Date.now(), cast: [] };
    }

    // Update Text Fields
    movieObj.title = title;
    movieObj.category = category;
    movieObj.description = desc;
    movieObj.link = link;

    // Handle Image Uploads (Only update if new file selected)
    if (posterFile) movieObj.poster = await toBase64(posterFile);
    
    // Handle Cast (Simplified for demo)
    const cName1 = document.getElementById('castName1').value;
    const cName2 = document.getElementById('castName2').value;
    
    // Reset cast array or update specific slots (Logic simplified for readability)
    let castArr = [];
    if(cName1) {
        let photo1 = cast1File ? await toBase64(cast1File) : (movieObj.cast[0]?.photo || 'assets/default.png');
        castArr.push({ name: cName1, photo: photo1 });
    }
    if(cName2) {
        let photo2 = cast2File ? await toBase64(cast2File) : (movieObj.cast[1]?.photo || 'assets/default.png');
        castArr.push({ name: cName2, photo: photo2 });
    }
    movieObj.cast = castArr;

    // Save
    if (!id) {
        movies.push(movieObj); // Add new
    } else {
        // Data is already reference modified, just re-save array
        const index = movies.findIndex(m => m.id == id);
        movies[index] = movieObj;
    }

    localStorage.setItem('moviesData', JSON.stringify(movies));
    alert('Movie Saved Successfully!');
    resetForm();
    loadMoviesTable();
}

function loadMoviesTable() {
    const movies = JSON.parse(localStorage.getItem('moviesData')) || [];
    const tbody = document.getElementById('adminMovieList');
    tbody.innerHTML = '';

    movies.forEach(movie => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${movie.poster || 'assets/placeholder.jpg'}" alt="img"></td>
            <td>${movie.title}</td>
            <td>${movie.category}</td>
            <td>
                <button class="btn-edit" onclick="editMovie(${movie.id})"><i class="fas fa-edit"></i></button>
                <button class="btn-danger" onclick="deleteMovie(${movie.id})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function deleteMovie(id) {
    if(confirm('Are you sure you want to delete this movie?')) {
        let movies = JSON.parse(localStorage.getItem('moviesData'));
        movies = movies.filter(m => m.id != id);
        localStorage.setItem('moviesData', JSON.stringify(movies));
        loadMoviesTable();
    }
}

function editMovie(id) {
    const movies = JSON.parse(localStorage.getItem('moviesData'));
    const movie = movies.find(m => m.id == id);

    document.getElementById('formTitle').innerText = "Edit Movie";
    document.getElementById('movieId').value = movie.id;
    document.getElementById('mTitle').value = movie.title;
    document.getElementById('mCategory').value = movie.category;
    document.getElementById('mDesc').value = movie.description;
    document.getElementById('mLink').value = movie.link;

    // Pre-fill cast names (Images can't be pre-filled in file input for security)
    if(movie.cast[0]) document.getElementById('castName1').value = movie.cast[0].name;
    if(movie.cast[1]) document.getElementById('castName2').value = movie.cast[1].name;

    window.scrollTo(0,0);
}

function resetForm() {
    document.getElementById('movieId').value = '';
    document.getElementById('formTitle').innerText = "Add New Movie";
    document.querySelectorAll('input').forEach(i => i.value = '');
    document.querySelector('textarea').value = '';
    }
