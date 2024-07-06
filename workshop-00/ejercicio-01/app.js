// Clase Task que representa una tarea individual
class Task {
    // Constructor para inicializar una nueva tarea con id, descripción y estado de completado
    constructor(id, description, completed = false) {
        this.id = id; // Identificador único de la tarea
        this.description = description; // Descripción de la tarea
        this.completed = completed; // Estado de completado de la tarea (por defecto es falso)
    }

    // Método para alternar el estado de completado de la tarea
    toggleComplete() {
        this.completed = !this.completed; // Cambia el estado de completado a su opuesto
    }
}

// Clase TaskManager que maneja una lista de tareas
class TaskManager {
    // Constructor para inicializar el administrador de tareas
    constructor() {
        // Carga las tareas desde el almacenamiento local o inicializa una lista vacía
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.loadTasks(); // Carga y renderiza las tareas
    }

    // Método para agregar una nueva tarea
    addTask(description) {
        // Genera un nuevo id basado en la longitud de la lista de tareas
        const id = this.tasks.length ? this.tasks[this.tasks.length - 1].id + 1 : 1;
        const task = new Task(id, description); // Crea una nueva instancia de Task
        this.tasks.push(task); // Agrega la nueva tarea a la lista de tareas
        this.saveTasks(); // Guarda la lista de tareas en el almacenamiento local
        this.renderTasks(); // Renderiza la lista de tareas actualizada
    }

    // Método para eliminar una tarea por id
    deleteTask(id) {
        // Filtra la lista de tareas para excluir la tarea con el id dado
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks(); // Guarda la lista de tareas actualizada en el almacenamiento local
        this.renderTasks(); // Renderiza la lista de tareas actualizada
    }

    // Método para alternar el estado de completado de una tarea por id
    toggleTaskComplete(id) {
        // Encuentra la tarea con el id dado
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.toggleComplete(); // Alterna el estado de completado de la tarea
            this.saveTasks(); // Guarda la lista de tareas actualizada en el almacenamiento local
            this.renderTasks(); // Renderiza la lista de tareas actualizada
        }
    }

    // Método para guardar la lista de tareas en el almacenamiento local
    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks)); // Convierte la lista de tareas a una cadena JSON y la guarda en el almacenamiento local
    }

    // Método para cargar las tareas desde el almacenamiento local
    loadTasks() {
        if (localStorage.getItem('tasks')) {
            // Si hay tareas guardadas en el almacenamiento local, las carga y crea instancias de Task para cada una
            this.tasks = JSON.parse(localStorage.getItem('tasks')).map(task => new Task(task.id, task.description, task.completed));
        }
        this.renderTasks(); // Renderiza la lista de tareas cargada
    }

    // Método para renderizar la lista de tareas en el DOM
    renderTasks() {
        const taskList = document.getElementById('task-list'); // Obtiene el elemento del DOM donde se mostrará la lista de tareas
        taskList.innerHTML = ''; // Limpia el contenido actual del elemento

        // Itera sobre la lista de tareas y crea elementos del DOM para cada tarea
        this.tasks.forEach(task => {
            const item = document.createElement('li'); // Crea un nuevo elemento de lista
            item.textContent = task.description; // Establece el texto del elemento como la descripción de la tarea
            item.className = task.completed ? 'completed' : ''; // Añade una clase CSS si la tarea está completada

            const label = document.createElement('label'); // Crea una etiqueta para el checkbox
            label.textContent = 'Completed'; // Establece el texto de la etiqueta

            const completedTask = document.createElement('input'); // Crea un checkbox
            completedTask.type = 'checkbox'; // Establece el tipo del input como checkbox
            completedTask.checked = task.completed; // Marca el checkbox si la tarea está completada

            // Añade un event listener para alternar el estado de completado de la tarea cuando el checkbox cambia
            completedTask.addEventListener('change', (e) => {
                this.toggleTaskComplete(task.id);
            });

            const deleteButton = document.createElement('button'); // Crea un botón de eliminar
            deleteButton.textContent = 'Eliminar'; // Establece el texto del botón

            // Añade un event listener para eliminar la tarea cuando se hace clic en el botón
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Evita la propagación del evento
                this.deleteTask(task.id); // Elimina la tarea
                this.toggleTaskComplete(task.id); // Alterna el estado de completado de la tarea
            });

            item.appendChild(deleteButton); // Añade el botón de eliminar al elemento de la lista
            item.appendChild(completedTask); // Añade el checkbox al elemento de la lista
            item.appendChild(label); // Añade la etiqueta al elemento de la lista
            taskList.appendChild(item); // Añade el elemento de la lista al elemento del DOM
        });
    }
}

// Event listener para inicializar TaskManager cuando el DOM se ha cargado completamente
document.addEventListener('DOMContentLoaded', () => {
    const taskManager = new TaskManager(); // Crea una nueva instancia de TaskManager

    // Añade un event listener al botón de agregar tarea
    document.getElementById('add-task').addEventListener('click', () => {
        const newTask = document.getElementById('new-task').value; // Obtiene el valor del input de nueva tarea
        if (newTask) {
            taskManager.addTask(newTask); // Añade la nueva tarea
            document.getElementById('new-task').value = ''; // Limpia el input de nueva tarea
        }
    });
});
