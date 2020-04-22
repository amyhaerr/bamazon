var inquirer = require("inquirer");

var mysql = require("mysql");
var chalk = require('chalk');
var prompt = require("prompt");
var Table = require("cli-table3");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",

  // Your password
  password: "$evErus13!",
  database: "bamazon_DB"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log(`You are connected as ${connection.threadId}`);
  //   connection.end();
  // showAllProd();
  optionMenu();
});

function showAllProd() {
  var sqlQuery = ("SELECT * FROM products");
  connection.query(sqlQuery, function (err, res) {
    if (err) throw err;
    var greeting = `\n Here are the products for today!\n`;
    console.log(greeting);
    var table = new Table({
      head: ['ID', 'Product', 'Department', 'Price', 'In Stock'],
      // colWidths: [10, 30, 15, 10, 10, 15]
    });
    for (var i = 0; i < res.length; i++) {
      table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
    }
    console.log(table.toString() + "\n");
  });
  connection.end();

}
function optionMenu() {
  inquirer.prompt({
    type: "list",
    message: "What would you like to do?",
    name: "choice",
    choices: [`Make a purchase`, `Exit`]
  })

}
function buyItem() {
  inquirer.prompt([{
    type: "input",
    message: `\n What product would you like to buy?`,
    name: "itemID",
    validate: function (value) {
      if (isNaN(value) === false) {
        return true;
      } {
        return false;

      }
    }
  },
  {

    type: "input",
    message: `\n How much of the item would you like to buy?`,
    name: "units",
    validate: function (value) {
      if (isNaN(value) === false) {
        return true;
      } {
        return false;

      },
    },
    {
      type: "confirm",
      message: `Is your order correct?`,
      name: 'confirmation',
      default: true

  },
  ])
    .then(function (response) {
    switch (response.choice) {
      case "Make a purchase":
        showAllProd();
        break;
      case "Exit":
        connection.end();
        console.log(`Thanks for visiting our store. Please come again!`)
        break;
    }
  });
}
