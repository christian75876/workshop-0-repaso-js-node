// Clase Note que representa una nota individual
class Note {
    // Constructor para inicializar una nueva nota con id, contenido de texto y estado de completado
    constructor(id, textContent, completed = false) {
        this.id = id; // Identificador único de la nota
        this.textContent = textContent; // Contenido de texto de la nota
        this.completed = completed; // Estado de completado de la nota (por defecto es falso)
    }
}

// Arreglo para almacenar las notas
let listNote = [];

// Función para agregar una nueva nota
const addNote = (content) => {
    const id = listNote.length + 1; // Genera un nuevo id basado en la longitud del arreglo de notas
    const note = new Note(id, content); // Crea una nueva instancia de Note
    listNote.push(note); // Agrega la nueva nota al arreglo de notas
    console.log(listNote); // Muestra las notas en la consola para verificación
};

// Función para eliminar una nota por id
const deleteNoteById = (id) => {
    // Filtra el arreglo de notas para excluir la nota con el id dado
    listNote = listNote.filter((note) => {
        return note.id !== id;
    });
    saveNotes(); // Guarda las notas actualizadas en el almacenamiento local
    showNotes(); // Renderiza las notas actualizadas
};

// Elemento del DOM donde se mostrará la lista de notas
const listNotes = document.getElementById('list-note');

// Función para renderizar la lista de notas en el DOM
const showNotes = () => {
    listNotes.innerHTML = ''; // Limpia el contenido actual del elemento

    // Itera sobre el arreglo de notas y crea elementos del DOM para cada nota
    listNote.forEach((note) => {
        const $noteItem = document.createElement('DIV'); // Crea un nuevo elemento DIV
        $noteItem.innerHTML = `Noticia: ${note.id} - Contenido: ${note.textContent}`; // Establece el contenido del elemento

        // Cambia el color del texto si la nota está completada
        if (note.completed) {
            $noteItem.style.color = 'red';
        } else {
            $noteItem.style.color = '';
        }

        // Crea un botón de eliminar
        const $deleteBtn = document.createElement('BUTTON');
        $deleteBtn.textContent = 'Eliminar'; // Establece el texto del botón
        $deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita la propagación del evento
            deleteNoteById(note.id); // Elimina la nota
        });

        // Crea un botón de actualizar
        const $updateBtn = document.createElement('BUTTON');
        $updateBtn.textContent = 'Actualizar'; // Establece el texto del botón
        $updateBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita la propagación del evento
            const newContent = prompt('Ingrese el nuevo contenido de su noticia'); // Solicita el nuevo contenido de la nota
            if (newContent) {
                note.textContent = newContent; // Actualiza el contenido de la nota
                saveNotes(); // Guarda las notas actualizadas en el almacenamiento local
                showNotes(); // Renderiza las notas actualizadas
            }
        });

        // Crea un checkbox para alternar el estado de completado de la nota
        const $toggle = document.createElement('input');
        $toggle.type = 'checkbox'; // Establece el tipo del input como checkbox
        $toggle.checked = note.completed; // Marca el checkbox si la nota está completada
        $toggle.addEventListener('change', (e) => {
            note.completed = $toggle.checked; // Cambia el estado de completado de la nota
            // Cambia el color del texto según el estado de completado
            if (note.completed) {
                $noteItem.style.color = 'red';
            } else {
                $noteItem.style.color = '';
            }
            saveNotes(); // Guarda las notas actualizadas en el almacenamiento local
            showNotes(); // Renderiza las notas actualizadas
        });

        $noteItem.appendChild($deleteBtn); // Añade el botón de eliminar al elemento de la nota
        $noteItem.appendChild($updateBtn); // Añade el botón de actualizar al elemento de la nota
        $noteItem.appendChild($toggle); // Añade el checkbox al elemento de la nota
        listNotes.appendChild($noteItem); // Añade el elemento de la nota al DOM
    });
};

// Función para cargar las notas desde el almacenamiento local
const loadNotes = () => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')); // Obtiene las notas guardadas en el almacenamiento local
    if (storedNotes) {
        // Si hay notas guardadas, las carga y crea instancias de Note para cada una
        listNote = storedNotes.map(noteData => {
            return new Note(noteData.id, noteData.textContent, noteData.completed);
        });
    }
    showNotes(); // Renderiza las notas cargadas
};

// Función para guardar las notas en el almacenamiento local
const saveNotes = () => {
    localStorage.setItem('notes', JSON.stringify(listNote)); // Convierte el arreglo de notas a una cadena JSON y la guarda en el almacenamiento local
};

// Función para inicializar el administrador de notas
const init = () => {
    const btn = document.getElementById('Add-note'); // Obtiene el botón de agregar nota

    // Añade un event listener al botón de agregar nota
    btn.addEventListener('click', () => {
        const content = prompt('Ingrese el contenido de su noticia'); // Solicita el contenido de la nueva nota
        if (content) {
            addNote(content); // Agrega la nueva nota
            showNotes(); // Renderiza las notas actualizadas
            saveNotes(); // Guarda las notas actualizadas en el almacenamiento local
        }
    });

    loadNotes(); // Carga las notas desde el almacenamiento local al iniciar
};

// Event listener para inicializar el administrador de notas cuando el DOM se ha cargado completamente
document.addEventListener('DOMContentLoaded', init);
