let inventory = [];

document.getElementById('itemForm').addEventListener('submit', addItem);

// This function is for adding items
function addItem(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const price = parseFloat(document.getElementById('price').value);
    const category = document.getElementById('category').value;

    if (name && quantity > 0 && price > 0) {
        const item = { name, quantity, price, category };
        inventory.push(item);
        document.getElementById('itemForm').reset();
        displayItems();
    } else {
        alert('Please fill in all fields with valid data.');
    }
}
// This function is displaying items
function displayItems() {
    const tableBody = document.getElementById('inventoryTable');
    tableBody.innerHTML = '';

    let totalValue = 0;
    inventory.forEach((item, index) => {
        const itemValue = item.quantity * item.price;
        totalValue += itemValue;

        const row = `
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>${item.category}</td>
                <td>$${itemValue.toFixed(2)}</td>
                <td>
                    <button onclick="deleteItem(${index})">Delete</button>
                    <button onclick="editItem(${index})">Edit</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });

    document.getElementById('totalValue').textContent = totalValue.toFixed(2);
}
// This function is for deleting items
function deleteItem(index) {
    inventory.splice(index, 1);
    displayItems();
}

// This function is for editing items
function editItem(index) {
    const item = inventory[index];
    document.getElementById('name').value = item.name;
    document.getElementById('quantity').value = item.quantity;
    document.getElementById('price').value = item.price;
    document.getElementById('category').value = item.category;

    inventory.splice(index, 1);
    displayItems();
}

// This function is for sorting items
function sortItems(order) {
    if (order === 'asc') {
        inventory.sort((a, b) => a.price - b.price);
    } else if (order === 'desc') {
        inventory.sort((a, b) => b.price - a.price);
    }
    displayItems();
}

// This function is for searching items
function searchItems() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const filteredItems = inventory.filter(item => 
        item.name.toLowerCase().includes(searchValue) || 
        item.category.toLowerCase().includes(searchValue)
    );
    
    displayFilteredItems(filteredItems);
}
// This function is for displaying the filtered items
function displayFilteredItems(items) {
    const tableBody = document.getElementById('inventoryTable');
    tableBody.innerHTML = '';

    let totalValue = 0;
    items.forEach((item, index) => {
        const itemValue = item.quantity * item.price;
        totalValue += itemValue;

        const row = `
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>${item.category}</td>
                <td>$${itemValue.toFixed(2)}</td>
                <td>
                    <button onclick="deleteItem(${index})">Delete</button>
                    <button onclick="editItem(${index})">Edit</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });

    document.getElementById('totalValue').textContent = totalValue.toFixed(2);
}
