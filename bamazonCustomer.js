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
  console.log("connected as id " + connection.threadId)
  afterConnection();
});

function afterConnection() {
  console.log("It's alive!")
};
