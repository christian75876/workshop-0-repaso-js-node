// Función para obtener datos desde una API usando fetch y manejo de errores
const apiFetch = async (page = 'https://api.escuelajs.co/api/v1/products') => {
    const URL = page;
    try {
        const resp = await fetch(URL); // Realiza la solicitud GET
        if (resp.ok) {
            const data = await resp.json(); // Si la respuesta es correcta, convierte a JSON
            return data;
        } else {
            throw new Error('Error al obtener los datos'); // Si hay un error, lanza una excepción
        }
    } catch (error) {
        console.error('Error en la solicitud:', error); // Muestra el error en la consola
        throw error; // Lanza el error para que pueda ser manejado por el llamador
    }
};

// Función para crear una tarjeta de producto en el DOM
const createCard = (element) => {
    const $div = document.createElement('div'); // Crea un nuevo div
    $div.innerHTML = `
        <h3>${element.title}</h3>
        <img src="${element.images[1]}" />
        <p>${element.description}</p>
        <h4>$${element.price}</h4>
    `; // Establece el contenido del div con los datos del producto
    console.log(element.images[0]);
    return $div; // Retorna el div creado
};

// Elemento del DOM donde se mostrarán los productos
const root = document.getElementById('root');

// Función para renderizar los elementos obtenidos desde la API
const renderElements = async () => {
    try {
        const data = await apiFetch(); // Obtiene los datos desde la API
        const fragment = document.createDocumentFragment(); // Crea un fragmento de documento
        data.forEach(element => {
            const card = createCard(element); // Crea una tarjeta para cada producto
            fragment.appendChild(card); // Añade la tarjeta al fragmento
        });
        root.appendChild(fragment); // Añade el fragmento al DOM
    } catch (error) {
        root.innerHTML = '<p>Ocurrió un error al cargar los productos.</p>'; // Muestra un mensaje de error en el DOM
        console.error('Error en renderElements:', error); // Muestra el error en la consola
    }
};

// Función para crear y manejar los filtros de búsqueda
const filter = () => {
    const input = document.createElement('INPUT');
    input.type = 'text';
    input.placeholder = 'buscar por precio'; // Campo de entrada para el precio

    const btn = document.createElement('BUTTON');
    btn.textContent = 'Search'; // Botón de búsqueda

    const $select = document.createElement('SELECT');
    const $option1 = document.createElement('OPTION');
    $option1.textContent = 'price';
    const $option2 = document.createElement('OPTION');
    $option2.textContent = 'max';

    $select.appendChild($option1); // Añade opción de precio
    $select.appendChild($option2); // Añade opción de máximo

    // Evento de clic para el botón de búsqueda
    btn.addEventListener('click', async () => {
        try {
            let data = await apiFetch(`https://api.escuelajs.co/api/v1/products/?price=${input.value}`); // Búsqueda por precio

            if ($select.value === 'max') {
                data = await apiFetch(`https://api.escuelajs.co/api/v1/products/?price_min=0&price_max=${input.value}&categoryId=1`); // Búsqueda por rango de precio
            }

            // Limpiar y renderizar los elementos filtrados
            const fragment = document.createDocumentFragment();
            data.forEach(element => {
                const card = createCard(element);
                fragment.appendChild(card);
            });

            const $allProducts = document.createElement('BUTTON');
            $allProducts.textContent = 'All'; // Botón para mostrar todos los productos
            $allProducts.addEventListener('click', async (e) => {
                e.preventDefault();
                renderElements(); // Renderiza todos los elementos cuando se hace clic
            });

            root.innerHTML = ''; // Limpiar contenido existente antes de renderizar
            
            root.appendChild(input);
            root.appendChild(btn);
            root.appendChild($select);
            root.appendChild($allProducts);
            root.appendChild(fragment);

        } catch (error) {
            root.innerHTML = `<p>Error al buscar: ${error.message}</p>`; // Muestra un mensaje de error en el DOM
            console.error('Error en filter:', error); // Muestra el error en la consola
        }
    });

    root.appendChild(input); // Añade el campo de entrada al DOM
    root.appendChild(btn); // Añade el botón de búsqueda al DOM
};

// Inicializa la función de filtro y renderiza los elementos al cargar el DOM
filter();
renderElements();
