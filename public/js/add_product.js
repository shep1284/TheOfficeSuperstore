// Get the objects we need to modify
let addProductForm = document.getElementById('add-product-form-ajax');

// Modify the objects we need
addProductForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputProductName = document.getElementById("input-product-name");
    let inputProductDescription = document.getElementById("input-product-description");
    let inputProductPrice = document.getElementById("input-product-price");
    let inputProductQuantity = document.getElementById("input-product-quantity");
    let inputProductSupplier = document.getElementById("input-product-supplier");
    let inputProductCategory = document.getElementById("input-product-category");

    // Get the values from the form fields
    let productNameValue = inputProductName.value;
    let productDescriptionValue = inputProductDescription.value;
    let productPriceValue = inputProductPrice.value;
    let productQuantityValue = inputProductQuantity.value;
    let productSupplierValue = inputProductSupplier.value;
    let productCategoryValue = inputProductCategory.value;

    // Put our data we want to send in a JavaScript object
    let data = {
        'product-name': productNameValue,
        'product-description': productDescriptionValue,
        'product-price': productPriceValue,
        'product-quantity': productQuantityValue,
        'product-supplier': productSupplierValue,
        'product-category': productCategoryValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-product-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputProductName.value = '';
            inputProductDescription.value = '';
            inputProductPrice.value = '';
            inputProductQuantity.value = '';
            inputProductSupplier.value = '';
            inputProductCategory.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
})

// Creates a single row from an Object representing a single record from the Office Superstore database
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("products-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and cells
    let row = document.createElement("TR");
    let productIDCell = document.createElement("TD");
    let productNameCell = document.createElement("TD");
    let productDescriptionCell = document.createElement("TD");
    let productPriceCell = document.createElement("TD");
    let productQuantityCell = document.createElement("TD");
    let productSupplierCell = document.createElement("TD");
    let productCategoryCell = document.createElement("TD");

    // Fill the cells with correct data
    productIDCell.innerText = newRow.productID;
    productNameCell.innerText = newRow.productName;
    productDescriptionCell.innerText = newRow.description;
    productPriceCell.innerText = newRow.unitPrice;
    productQuantityCell.innerText = newRow.quantityInStock;
    productSupplierCell.innerText = newRow.supplierName;
    productCategoryCell.innerText = newRow.category;

    // Add the cells to the row 
    row.appendChild(productIDCell);
    row.appendChild(productNameCell);
    row.appendChild(productDescriptionCell);
    row.appendChild(productPriceCell);
    row.appendChild(productQuantityCell);
    row.appendChild(productSupplierCell);
    row.appendChild(productCategoryCell);
    
    // Add the row to the table
    currentTable.appendChild(row);
}
