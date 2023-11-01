-- Project Title: The Office Superstore
-- Group 3
-- Members: Finn Shepherd, Tyler Sphar



SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

CREATE OR REPLACE TABLE Suppliers (
    supplierID INT AUTO_INCREMENT PRIMARY KEY,
    supplierName VARCHAR(100) NOT NULL,
    contactName VARCHAR(50),
    email VARCHAR(100),
    phone VARCHAR(20),
    address TEXT
);

CREATE OR REPLACE TABLE ProductCategories (
    categoryID INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(50) NOT NULL
);

CREATE OR REPLACE TABLE Products (
    productID INT AUTO_INCREMENT PRIMARY KEY,
    productName VARCHAR(255) NOT NULL,
    description TEXT,
    unitPrice DECIMAL(10, 2) NOT NULL,
    quantityInStock INT NOT NULL,
    supplierID INT NOT NULL,
    categoryID INT NOT NULL,
    FOREIGN KEY (supplierID) REFERENCES Suppliers(supplierID),
    FOREIGN KEY (categoryID) REFERENCES ProductCategories(categoryID)
);

CREATE OR REPLACE TABLE Customers (
    customerID INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20),
    address TEXT
);

CREATE OR REPLACE TABLE SalesOrders (
    orderID INT AUTO_INCREMENT PRIMARY KEY,
    orderDate DATE NOT NULL,
    customerID INT NOT NULL,
    FOREIGN KEY (customerID) REFERENCES Customers(customerID)
);

CREATE OR REPLACE TABLE ProductSales (
    productSaleID INT AUTO_INCREMENT PRIMARY KEY,
    productID INT NOT NULL,
    orderID INT NOT NULL,
    quantitySold INT NOT NULL,
    salePrice DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (productID) REFERENCES Products(productID) ON DELETE CASCADE,
    FOREIGN KEY (orderID) REFERENCES SalesOrders(orderID)
);

INSERT INTO Suppliers (supplierName, contactName, email, phone, address)
VALUES
    ('Office Furnishings Inc.', 'Susan Johnson', 'susan.johnson@officefurnishings.com', '(555) 555-5555', '123 Furniture Blvd, Suite 200'),
    ('Tech Office Solutions', 'Michael Williams', 'michael.williams@techofficesolutions.com', '(555) 555-1234', '456 Tech Street, Suite 300'),
    ('Office Tech Suppliers', 'David Smith', 'david.smith@officetechsuppliers.com', '(555) 555-9876', '789 Electronics Avenue, Unit 101');

INSERT INTO ProductCategories (category)
VALUES
    ('Furniture'),
    ('Electronics'),
    ('Office Supplies');

INSERT INTO Products (productName, description, unitPrice, quantityInStock, supplierID, categoryID)
VALUES
    ('Office Chair', 'Comfortable chair for office use.', 199.99, 120, 1, 1),
    ('Computer Desk', 'Spacious computer desk with storage.', 299.99, 85, 2, 1),
    ('Printer', 'High-quality office printer.', 399.99, 45, 3, 2),
    ('Desk Organizer', 'Organize your desk essentials.', 24.99, 200, 1, 3),
    ('Laptop', 'Powerful laptop for work and play.', 799.99, 60, 2, 2);

INSERT INTO Customers (firstName, lastName, email, phone, address)
VALUES
    ('John', 'Doe', 'john.doe@email.com', '(555) 123-4567', '123 Main St'),
    ('Jane', 'Smith', 'jane.smith@email.com', '(555) 987-6543', '456 Elm St'),
    ('Bob', 'Johnson', 'bob.johnson@email.com', '(555) 555-5555', '789 Oak St');

INSERT INTO SalesOrders (orderDate, customerID)
VALUES
    ('2023-10-01', 1),
    ('2023-10-05', 1),
    ('2023-10-01', 2),
    ('2023-10-03', 2);

INSERT INTO ProductSales (productID, orderID, quantitySold, salePrice)
VALUES
    (1, 1, 2, 399.98),
    (2, 1, 1, 299.99),
    (3, 1, 1, 399.99),
    (1, 2, 2, 399.98),
    (4, 3, 3, 74.97);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;
