// Fonction pour obtenir les utilisateurs du localStorage
function getUsers() {
    let users = localStorage.getItem('users');
    if (users) {
        return eval(users); // eval pour convertir la chaîne en un tableau
    } else {
        return [{ firstName: 'Salma', lastName: 'Benk', email: 'salma@gmail.com', password: 'password123' }];
    }
}


function addUser() {
    const firstName = document.getElementById('signUpFirstName').value;
    const lastName = document.getElementById('signUpLastName').value;
    const email = document.getElementById('signUpEmail').value;
    const password = document.getElementById('signUpPassword').value;
    const errorSpan = document.getElementById('signUpError');

    // Vérifier si le mot de passe contient au moins 8 caractères
    if (password.length < 8) {
        errorSpan.textContent = 'Password must contain at least 8 characters';
        return;
    }

    // Récupérer les utilisateurs existants ou initialiser une liste vide
    let users = getUsers();
    // Ajouter le nouvel utilisateur à la liste
    users.push({ firstName, lastName, email, password });
    // Stocker la liste mise à jour dans le localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Afficher un message de succès et réinitialiser les champs de formulaire
    errorSpan.textContent = 'User added successfully';
    document.getElementById('signUpFirstName').value = '';
    document.getElementById('signUpLastName').value = '';
    document.getElementById('signUpEmail').value = '';
    document.getElementById('signUpPassword').value = '';
}


function showUsers() {
    const userTable = document.getElementById('userTable');
    // Réinitialiser le contenu du tableau
    userTable.innerHTML = '<tr><th>First Name</th><th>Last Name</th><th>Email</th><th>Password</th></tr>';

    // Récupérer les utilisateurs du localStorage
    const users = getUsers();
    // Ajouter chaque utilisateur au tableau
    users.forEach(user => {
        const tr = document.createElement('tr');
        const tdFirstName = document.createElement('td');
        const tdLastName = document.createElement('td');
        const tdEmail = document.createElement('td');
        const tdPassword = document.createElement('td');
        tdFirstName.textContent = user.firstName;
        tdLastName.textContent = user.lastName;
        tdEmail.textContent = user.email;
        tdPassword.textContent = user.password;
        tr.appendChild(tdFirstName);
        tr.appendChild(tdLastName);
        tr.appendChild(tdEmail);
        tr.appendChild(tdPassword);
        userTable.appendChild(tr);
    });
}

// Fonction pour basculer la visibilité du mot de passe
function togglePasswordVisibility() {
    const passwordField = document.getElementById('signInPassword');
    passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
}

// Fonction pour se connecter
function login() {
    const email = document.getElementById('signInEmail').value;
    const password = document.getElementById('signInPassword').value;
    const errorSpan = document.getElementById('signInError');

    // Récupérer les utilisateurs du localStorage
    const users = getUsers();
    // Trouver l'utilisateur correspondant
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        alert('Login successful');
        errorSpan.textContent = '';
    } else {
        errorSpan.textContent = 'Email or password incorrect';
    }
}