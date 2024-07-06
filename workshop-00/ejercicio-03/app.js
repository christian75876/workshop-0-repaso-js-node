// Añade un event listener al botón con id 'fetch-posts' para llamar a la función fetchPosts cuando se haga clic
document.getElementById('fetch-posts').addEventListener('click', () => {
    fetchPosts();
});

// Función para obtener los posts desde una API
const fetchPosts = () => {
    // Realiza una solicitud GET a la URL de la API
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
            // Verifica si la respuesta es correcta (status 200-299)
            if (!response.ok) {
                // Si no es correcta, lanza un error con el mensaje de estado
                throw new Error('Network response was not ok ' + response.statusText);
            }
            // Convierte la respuesta a JSON
            return response.json();
        })
        .then(posts => {
            // Llama a la función displayPosts para mostrar los posts en el DOM
            displayPosts(posts);
        })
        .catch(error => {
            // Si hay un error en la solicitud, llama a la función displayError para mostrar el error en el DOM
            displayError(error);
        });
};

// Función para mostrar los posts en el DOM
const displayPosts = (posts) => {
    const postList = document.getElementById('post-list'); // Obtiene el elemento del DOM donde se mostrará la lista de posts
    postList.innerHTML = ''; // Limpia el contenido actual del elemento

    // Itera sobre el arreglo de posts y crea elementos del DOM para cada post
    posts.forEach(post => {
        const listItem = document.createElement('li'); // Crea un nuevo elemento de lista
        listItem.textContent = `Title: ${post.title}`; // Establece el texto del elemento como el título del post
        postList.appendChild(listItem); // Añade el elemento de lista al DOM
    });
};

// Función para mostrar los errores en el DOM
const displayError = (error) => {
    const errorMessage = document.getElementById('error-message'); // Obtiene el elemento del DOM donde se mostrará el mensaje de error
    errorMessage.textContent = `Error: ${error.message}`; // Establece el texto del elemento como el mensaje de error
};
