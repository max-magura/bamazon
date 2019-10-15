var inquirer = require("inquirer");
var mysql = require("mysql");

var connectionObject = 
  {
    host: "localhost",
    port: 3306,
    user: "max",
    password: "fsfVandymax123", 
    database: "bamazon"
};

var connection = mysql.createConnection(connectionObject);

connection.connect(function(err) {
  if(err) throw err;
  // console.log("connected as id " + connection.threadId)
  displayProducts();
});

function displayProducts() {
  connection.query("SELECT * FROM products", function(err, result) {
    if (err) throw err;
    console.table(result);
    startInq();
  });
};

function startInq() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;

  inquirer.prompt([
    {
    name: "itemID",
    type: "input",
      message: "What is the item ID for the product you would like to buy?"
    },
    {
    name: "quantity",
    type: "input",
    message: "How many units would you like to purchase?",
    validate: function(value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
    }
    }])
    .then(function(answer) {

      var chosenProduct;

      for (var i = 0; i < results.length; i++) {
        if (results[i].item_id === parseInt(answer.itemID)) {
          chosenProduct = results[i];
        }
      }

      // console.log(chosenProduct)

      if (chosenProduct.stock_quantity > parseInt(answer.quantity)){
        console.log("\n Great! We have enough in stock. For this purchase of " + answer.quantity + " units of " + chosenProduct.product_name + " you owe: $" + answer.quantity*chosenProduct.price)
      
      }
      else {
        console.log("\n Unfortunately, we don't have enough of that product. Please choose a new product or lower your quantity. \n")
        displayProducts()
      }

    })

  })
};