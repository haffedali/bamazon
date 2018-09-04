var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "hoff",
  
    // Your password
    password: "",
    database: "bamazon"
  });

inquirer.prompt({
    type: "list",
    message: "What would you like to access?",
    choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
    ],
    name: "choice"
}).then(function(ans){
    switch (ans.choice) {
    case "View Products for Sale":
        viewProd();
        break;
    case "View Low Inventory":
        viewLow();
        break;
    case "Add to Inventory":
        addInv();
        break;
    case "Add New Product":
        addProd();
        break;
    }
})

function viewProd(){
    connection.connect(function(err) {
        if (err) throw err;
        console.log("connected as id " + connection.threadId);
        afterConnection();
      });
      
      function afterConnection() {
        connection.query(
          "SELECT * FROM products",
          function(err, res) {
              if (err) throw err;
              for (var i=0; i<res.length; i++){
                  console.log(res[i]);
                  console.log("\n-------------------------------------\n");
              }
              // console.log(res[0]);
              connection.end();
          }
        );
      }
};

function viewLow(){
    connection.connect(function(err) {
        if (err) throw err;
        console.log("connected as id " + connection.threadId);
        afterConnection();
      });
      
      function afterConnection() {
        connection.query(
          "SELECT * FROM products",
          function(err, res) {
              if (err) throw err;
              for (var i=0; i<res.length; i++){
                  if (res[i].stock_quantity < 5) {
                  console.log(res[i]);
                  console.log("\n-------------------------------------\n");
                  };
              };
              // console.log(res[0]);
              connection.end();
          }
        );
      }
};
//Use inquire to add said amount to inventory
function addInv(){
    connection.connect(function(err) {
        if (err) throw err;
        console.log("connected as id " + connection.threadId);
        afterConnection();
      });

    function afterConnection(){
        connection.query("UPDATE products SET ? WHERE ?")
    }
};

function addProd(){};