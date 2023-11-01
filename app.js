

var express = require('express');   // We are using the express library for the web server
var db = require('./database/db-connector')
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
PORT        = 4214;

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

app.get('/', function (req, res) {
    // Define a SQL query to select product data
    let query = "SELECT * FROM Products";

    // Execute the SQL query to fetch product data
    db.pool.query(query, function (error, rows, fields) {
        if (error) {
            console.error('Error executing the query:', error);
            return res.status(500).send('Internal Server Error');
        }

        // Render the 'index' Handlebars template and pass the product data
        res.render('index', { data: rows });
    });
});

app.post('/add-product-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JavaScript object
    let data = req.body;

    // Capture NULL values
    let supplierID = parseInt(data['product-supplier']);
    if (isNaN(supplierID))
    {
        supplierID = 'NULL';
    }

    let category = db.pool.escape(data['product-category']);

    // Create the query and run it on the Office Superstore database
    query1 = `INSERT INTO Products (productName, description, unitPrice, quantityInStock, supplierID, categoryID) 
              VALUES (${db.pool.escape(data['product-name'])}, ${db.pool.escape(data['product-description'])}, 
              ${parseFloat(data['product-price'])}, ${parseInt(data['product-quantity'])}, ${supplierID}, 
              (SELECT categoryID FROM ProductCategories WHERE category = ${category}))`;

    db.pool.query(query1, function(error, rows, fields){
        if (error) {
            // Log the error to the terminal so we know what went wrong and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        } else {
            // If there was no error, perform a SELECT to get the updated data
            query2 = `SELECT * FROM Products;`;
            db.pool.query(query2, function(error, rows, fields){
                if (error) {
                    // Log the error to the terminal so we know what went wrong and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            });
        }
    });
});



app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
        console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
    });

