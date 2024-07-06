// Array de productos
const products = [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 1500, stock: 10 },
    { id: 2, name: 'Smartphone', category: 'Electronics', price: 800, stock: 20 },
    { id: 3, name: 'Headphones', category: 'Electronics', price: 100, stock: 30 },
    { id: 4, name: 'T-shirt', category: 'Clothing', price: 20, stock: 50 },
    { id: 5, name: 'Jeans', category: 'Clothing', price: 50, stock: 40 },
    { id: 6, name: 'Sneakers', category: 'Clothing', price: 80, stock: 30 },
    { id: 7, name: 'Backpack', category: 'Accessories', price: 40, stock: 25 },
    { id: 8, name: 'Watch', category: 'Accessories', price: 60, stock: 20 },
    { id: 9, name: 'Sunglasses', category: 'Accessories', price: 30, stock: 35 }
];

// Obtén la referencia al elemento root en el DOM
const root = document.getElementById('root');

// Crear elementos del DOM para el filtro y la búsqueda
const $label = document.createElement('label');
$label.textContent = 'Category';

const $selectList = document.createElement('SELECT');
const $option1 = document.createElement('OPTION');
$option1.textContent = 'Electronics';
const $option2 = document.createElement('OPTION');
$option2.textContent = 'Clothing';
const $option3 = document.createElement('OPTION');
$option3.textContent = 'Accessories';
const $option4 = document.createElement('OPTION');
$option4.textContent = 'All';

const btnTotal = document.createElement('BUTTON');

$selectList.appendChild($option1);
$selectList.appendChild($option2);
$selectList.appendChild($option3);
$selectList.appendChild($option4);

const $listElement = document.createElement('DIV');
$listElement.style.display = 'flex';

const $search = document.createElement('INPUT');
$search.type = 'text';
$search.placeholder = 'Search...';

const $btnSearch = document.createElement('BUTTON');
$btnSearch.textContent = 'Search';

// Añadir los elementos al DOM
root.appendChild($search);
root.appendChild($btnSearch);
root.appendChild($label);
root.appendChild($selectList);
root.appendChild($listElement);
root.appendChild(btnTotal);

// Función para buscar un producto por su nombre
const search = () => {
    const encontrado = products.find(e => e.name === $search.value);
    if (encontrado) {
        const arr = [encontrado];
        showItems(arr);
    } else {
        alert('Nombre no encontrado');
    }
};

// Event listener para el botón de búsqueda
$btnSearch.addEventListener('click', (e) => {
    e.preventDefault();
    search();
});

// Función para crear un elemento de producto en el DOM
const createElement = ({ id, name, category, price, stock }) => {
    const $element = document.createElement('DIV');
    $element.innerHTML = `
    <div style="border: 1px solid #ccc; border-radius: 5px; padding: 10px; margin-bottom: 10px; width: 300px;">
        <h3 style="margin-bottom: 5px;">Id: ${id} Nombre: ${name}</h3>
        <h3 style="margin-bottom: 5px;">Category: ${category}</h3>
        <p style="margin-bottom: 5px;">Quantity: ${stock}</p>
        <p style="margin-bottom: 0;">Price: \$${price}</p>
    </div> 
    `;
    return $element;
};

// Función para mostrar los nombres de los productos filtrados
const listName = (arr) => {
    const fragment = document.createDocumentFragment();
    arr.map(e => e.name).forEach(e => {
        const $element = document.createElement('LABEL');
        $element.textContent = e;
        fragment.appendChild($element);
    });
    root.appendChild(fragment);
};

// Función para verificar si todos los productos están disponibles
const allProductsAvailable = (product) => {
    const available = product.every(r => r.stock > 0);
    const $available = document.createElement('LABEL');
    if (available) {
        $available.textContent = 'All products are available';
    } else {
        $available.textContent = 'There are no products available';
    }
    root.appendChild($available);
};

// Función para mostrar los elementos filtrados en el DOM
const showItems = (element) => {
    root.innerHTML = '';
    $listElement.innerHTML = '';
    root.appendChild($search);
    root.appendChild($btnSearch);
    root.appendChild($label);
    root.appendChild($selectList);
    root.appendChild($listElement);
    root.appendChild(btnTotal);
    const fragment = document.createDocumentFragment();
    element.forEach(e => {
        const element = createElement(e);
        fragment.appendChild(element);
    });

    $listElement.appendChild(fragment);
};

// Event listener para el filtro de categoría
$selectList.addEventListener('change', (e) => {
    e.preventDefault();
    const productsFilter = products.filter(e => e.category === $selectList.value);
    if ($selectList.value === 'All') {
        showItems(products);
        return;
    }
    showItems(productsFilter);
    allProductsAvailable(products);
    listName(productsFilter);

    btnTotal.textContent = "Total";
    btnTotal.addEventListener("click", (e) => {
        const total = document.createElement('LABEL');
        const totalPrice = productsFilter.reduce((acumulador, value) => acumulador + value.price, 0);
        total.textContent = `Total: $${totalPrice}`;
        root.innerHTML = '';
        root.appendChild($label);
        root.appendChild($selectList);
        root.appendChild($listElement);
        root.appendChild(btnTotal);
        root.appendChild(total);
    });
});
