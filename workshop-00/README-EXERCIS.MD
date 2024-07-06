### README

# JavaScript Exercises

Este documento proporciona una descripción de cinco ejercicios diferentes en JavaScript. Cada ejercicio aborda un aspecto distinto de la programación y manipulación del DOM. A continuación, se detallan los cinco ejercicios en el orden en que fueron proporcionados.

## Ejercicio 1: Task Manager

### Descripción:
Este ejercicio implementa un gestor de tareas utilizando JavaScript y localStorage para almacenar las tareas de manera persistente.

### Clases y Métodos:
- **Task**: Clase que representa una tarea.
  - **constructor(id, description, completed = false)**: Inicializa una nueva tarea.
  - **toggleComplete()**: Alterna el estado de completado de la tarea.

- **TaskManager**: Clase que gestiona las tareas.
  - **constructor()**: Inicializa la lista de tareas desde localStorage.
  - **addTask(description)**: Agrega una nueva tarea.
  - **deleteTask(id)**: Elimina una tarea por su ID.
  - **toggleTaskComplete(id)**: Alterna el estado de completado de una tarea por su ID.
  - **saveTasks()**: Guarda las tareas en localStorage.
  - **loadTasks()**: Carga las tareas desde localStorage.
  - **renderTasks()**: Renderiza las tareas en el DOM.

### Uso:
```javascript
document.addEventListener('DOMContentLoaded', () => {
    const taskManager = new TaskManager();

    document.getElementById('add-task').addEventListener('click', () => {
        const newTask = document.getElementById('new-task').value;
        if (newTask) {
            taskManager.addTask(newTask);
            document.getElementById('new-task').value = '';
        }
    });
});
```

## Ejercicio 2: Note Manager

### Descripción:
Este ejercicio gestiona una lista de notas, permitiendo agregar, eliminar, actualizar y marcar notas como completadas. Las notas se almacenan en localStorage para persistencia.

### Funciones y Métodos:
- **Note**: Clase que representa una nota.
  - **constructor(id, textContent, completed = false)**: Inicializa una nueva nota.

- **Funciones**:
  - **addNote()**: Agrega una nueva nota a la lista.
  - **deleteNoteById(id)**: Elimina una nota por su ID.
  - **showNotes()**: Muestra todas las notas en el DOM.
  - **loadNotes()**: Carga las notas desde localStorage.
  - **saveNotes()**: Guarda las notas en localStorage.
  - **init()**: Inicializa el gestor de notas y los event listeners.

### Uso:
```javascript
document.addEventListener('DOMContentLoaded', init);
```

## Ejercicio 3: Fetch Posts

### Descripción:
Este ejercicio obtiene publicaciones de una API pública y las muestra en el DOM. También maneja errores de red y muestra mensajes de error.

### Funciones:
- **fetchPosts()**: Realiza una solicitud fetch para obtener publicaciones.
- **displayPosts(posts)**: Muestra las publicaciones en el DOM.
- **displayError(error)**: Muestra un mensaje de error en el DOM.

### Uso:
```javascript
document.getElementById('fetch-posts').addEventListener('click', () => {
    fetchPosts();
});
```

## Ejercicio 4: API Fetch con Filtro

### Descripción:
Este ejercicio realiza una solicitud fetch a una API para obtener productos y los muestra en el DOM. Permite filtrar productos por precio y categoría.

### Funciones y Métodos:
- **apiFetch(page)**: Realiza una solicitud fetch a la API.
- **createCard(element)**: Crea un elemento de tarjeta para un producto.
- **renderElements()**: Renderiza los productos en el DOM.
- **filter()**: Añade funcionalidad de filtro por precio y categoría.

### Uso:
```javascript
document.addEventListener('DOMContentLoaded', () => {
    filter();
    renderElements();
});
```

## Ejercicio 5: Gestión de Productos

### Descripción:
Este ejercicio gestiona una lista de productos, permitiendo buscar productos por nombre y filtrar por categoría. Muestra los productos en el DOM y calcula el precio total de los productos filtrados.

### Funciones y Métodos:
- **search()**: Busca un producto por nombre.
- **createElement({id, name, category, price, stock})**: Crea un elemento de producto.
- **listName(arr)**: Lista los nombres de los productos filtrados.
- **allProductsAvailable(product)**: Verifica si todos los productos están disponibles.
- **showItems(element)**: Muestra los elementos filtrados en el DOM.

### Uso:
```javascript
document.addEventListener('DOMContentLoaded', () => {
    const $selectList = document.getElementById('category-select');
    $selectList.addEventListener('change', handleCategoryChange);
    document.getElementById('search-button').addEventListener('click', handleSearch);
});
```

## Notas Adicionales:
- Asegúrese de que los elementos del DOM como `#task-list`, `#post-list`, `#root`, etc., estén presentes en su archivo HTML.
- Los ejemplos de uso asumen que los elementos de la interfaz de usuario ya están configurados correctamente en el HTML.

