var mysql = require("mysql");
var inquirer = require("inquirer");

var id;
var product;
var department;
var price;
var quantity;
var rawTotal;
var total;
var stock;
var remaining_stock;

//==================================================================================

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
		startTransaction();
	});
};

function startTransaction() {
	inquirer
		.prompt({
			name: "buyOrNo",
			type: "confirm",
			message: "Do you wish to buy anything today?"
		}).then(function(answer) {
			if (answer.buyOrNo === true) {
				console.log("Perfect! Initializing...");
				addToBasket();
			} else {
				console.log("Ok then! See you next time!");
				console.log("======================================");
				// connection.end();
			}
		})
};

function addToBasket() {
	inquirer
		.prompt([
		{
			name: "id",
			type: "input",
			message: "What is the item ID number of the item you wish to purchase?"
		},
		{
			name: "quantity",
			type: "input",
			message: "How many would you like to purchase today?"
		}
		]).then(function(answer) {
		
			connection.query(
				"SELECT item_id, product_name, price, stock_quantity FROM products WHERE item_id = " + answer.id, function(err, results) {
					if(err) throw err;
						id = results[0].item_id;
						product = results[0].product_name;
						department = results[0].department_name;
						price = results[0].price;
						stock = results[0].stock_quantity;

						quantity = answer.quantity;
							remaining_stock = stock - quantity;
							rawTotal = price * quantity;
							total = rawTotal.toFixed(2);



					if (quantity < stock) {
						
							if (quantity>1) {
									console.log("\n You have purchased " + quantity + " " + product + "s.");
								} else if (quantity = 1) {
									console.log("\n You have purchased " + quantity + " " + product + ".");
								} else if (quantity < 1) {
									console.log("You have entered an amount that is simply silly. Please try again.");
									addToBasket();
								}

							console.log("Your total comes out to $" + total);
							console.log("\nThere are " + remaining_stock + " remaining.");

							
							connection.query(
							"UPDATE products SET ? WHERE ?", {
								stock_quantity: remaining_stock
							}); 

							inquirer
								.prompt({
									name: "goAgain",
									type: "confirm",
									message: "Do you wish to buy anything else today?"
								}).then(function(answer) {
									if (answer.goAgain === true) {
										console.log("Perfect! Initializing...");
										// afterConnection();
										addToBasket();
									} else {
										console.log("Ok then! See you next time!");
										console.log("======================================");
										connection.end();
									}
								});
							

					} else {
						
							console.log("You have selected too many! Please retry your purchase.");
							addToBasket();
					};

							
					

				});

		});
};


