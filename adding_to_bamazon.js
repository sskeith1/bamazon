var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "password",
	database: "bamazon_db"
});

//==================================================================================
//==================================================================================
connection.connect(function(err) {
	if (err) throw err;
		console.log("connected as id " + connection.threadId);
		afterConnection();
});


function afterConnection() {
	connection.query("SELECT * FROM products", function(err, res) {
	if (err) throw err;
		console.log(res);
		start();
	});
};


function start() {
	inquirer
		.prompt({
			name: "addMore",
			type: "confirm",
			message: "Do you wish to add anything today?"
		}).then(function(answer) {
			if (answer.addMore === true) {
				console.log("Perfect! Initializing...");
				addProducts();
			} else {
				console.log("Ok then! See you next time!");
				{ break; }
			}
		})
}


function addProducts() {
	inquirer
		.prompt([
			{
				name: "productName",
				type: "input",
				message: "What product would you like to add?"
			}, {
				name: "departmentName",
				type: "input",
				message: "To which department should we add this too?"
			}, {
				name: "productPrice",
				type: "input",
				message: "What is the selling price of said product?"
			},{
				name: "stockQuantity",
				type: "input",
				message: "How many would you like to add?"
			}
		]).then(function(answer) {
			connection.query(
				"INSERT INTO products SET ?",
				{
					product_name: answer.productName,
					department_name: answer.departmentName,
					price: answer.productPrice,
					stock_quantity: answer.stockQuantity
				},
				function(err) {
					if (err) throw err;
					console.log("Your item has been added successfully!");
					console.log("======================================");
					connection.end();
				}
			)
		});
}


//add stuff for loop: if no more, hit "n", show db: Products and call it a day