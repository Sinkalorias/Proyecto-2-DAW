// Obtener referencias a los elementos del formulario
const registrationForm = document.getElementById('registrationForm');
const errorMessage = document.getElementById('errorMessage');

// Función para cargar usuarios desde localStorage
function loadUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

// Función para guardar usuarios en localStorage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Validar si el usuario ya existe
function isUserRegistered(username, users) {
    return users.some(user => user.username === username);
}

// Manejar el evento de envío del formulario
registrationForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    // Obtener valores de los campos
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const role = document.getElementById('role').value;

    // Validar campos
    if (password !== confirmPassword) {
        errorMessage.textContent = "Las contraseñas no coinciden.";
        return;
    }

    if (!role) {
        errorMessage.textContent = "Debes seleccionar un rol.";
        return;
    }

    // Cargar usuarios desde localStorage
    const users = loadUsers();

    // Validar si el usuario ya está registrado
    if (isUserRegistered(username, users)) {
        errorMessage.textContent = "El nombre de usuario ya está registrado.";
        return;
    }

    // Registrar nuevo usuario
    users.push({ username, password, role }); // Guardamos el usuario con el rol
    saveUsers(users);

    // Mensaje de éxito y reiniciar el formulario
    alert(`Usuario registrado con éxito como ${role}.`);
    registrationForm.reset();
    errorMessage.textContent = "";
});
