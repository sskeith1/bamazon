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
		startTransaction();
	});
};

function startTransaction() {
	inquirer
		.prompt({
			name: "buyOrNo",
			type: "confirm",
			message: "Do you wish to add buy today?"
		}).then(function(answer) {
			if (answer.buyOrNo === true) {
				console.log("Perfect! Initializing...");
				addToBasket();
			} else {
				console.log("Ok then! See you next time!");
				//QUIT SCRIPT SOMEHOW?!?!?!
			}
		})
};