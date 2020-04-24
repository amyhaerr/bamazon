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
  optionMenu();
});


function optionMenu() {
  inquirer.prompt({
      name: "choice",
      type: "list",
      message: "What would you like to do?",
      choices: ["Make a purchase", "Exit"]
    })
    .then(function (response) {
      switch (response.choice) {
        case "Make a purchase":
          showAllProd();
          break;
        case "Exit":
          connection.end();
          console.log("You have exited the program");
          break;
      }
    });
}

function showAllProd() {
  var sqlQuery = "SELECT * FROM products";
  connection.query(sqlQuery, function (err, res) {
    if (err) throw err;
    var greeting = `\n Here are the products for today!\n`;
    console.log(greeting);
    var table = new Table({
      head: ['ID', 'Product', 'Department', 'Price', 'In Stock'],
      colWidths: [10, 30, 15, 10, 10, 15]
    });
    for (var i = 0; i < res.length; i++) {
      table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
    }
    console.log(table.toString() + "\n");
    buyItem();
  });

}

function buyItem() {
  inquirer.prompt([{
        name: "itemID",
        type: "input",
        message: `\n What product would you like to buy?`,

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

          }
        }
      },
        {
        type: "confirm",
        message: `Is your order correct?`,
        name: "confirmation",
        default: true

      },
    ])
    // connect to entire table to pull and append data from specific columns
    .then(function (userResponse) {
      if (userResponse.confirmation === false) {
        console.log(`Please re-enter your item and quantity`);
        buyItem();
      } else {

      var query = "SELECT * FROM products WHERE ?";
      // assigning item_id column to user choice
      connection.query(query, {
          item_id: userResponse.itemID
        }, function (err, response) {
          if (err) throw err;
          // inform customer of how many units they've purchased
          if (userResponse.units > response[0].stock_quantity) {
            console.log('Insufficient quantity');
            optionMenu();
          } else {
            console.log(`\nYou have purchased: ${userResponse.units} ${response[0].product_name}\n`);
            console.log('order processing');
            var totalCost = userResponse.units * response[0].price;
            var updatedStock = response[0].stock_quantity - userResponse.units;
            var updateTable = "UPDATE products SET stock_quantity = " + updatedStock + " WHERE item_id = " + userResponse.itemID;
            connection.query(updateTable, function (err, response) {
              if (err) throw err;
              console.log(`\nYour purchase is complete! Your total cost is ${totalCost}\n`);
              connection.end();
            })
          }
        }

      )
    }});
};