var inquirer = require ("inquirer");

var mysql = require("mysql");

var prompt = require("prompt");
var TABLE = require("cli-table3");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",

  // Your password
  password: "$evErus13!",
  database: "bamazon_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log(`You are connected as ${connection.threadId}`);
//   connection.end();
showAllProd();
});

function showAllProd() {
    var sqlQuery = ("SELECT * FROM products");
    connection.query(sqlQuery, functionn(err,res){
        if (err) throw err;
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