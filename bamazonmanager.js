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
//at start choose from four options
//each option fires a serarate function
inquirer.prompt({
    type: "list",
    message: "What would you like to access?",
    choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
    ],
    name: "choice"})
    .then(function(ans){
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



//View all available products
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


//View all products that have reached 'low stock' threshhold
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
    var stock;
    var choice;
    var itemList = [];
    var num;
    connection.connect(function(err) {
        if (err) throw err;
        console.log("connected as id " + connection.threadId);
        afterConnection();
      });

      function afterConnection(){
        connection.query(
            "SELECT * FROM products", function(err, res){
            if (err) throw (err);
            for (var i=0; i<res.length;i++){
                itemList.push(res[i].product_name)
            }
            inquirer.prompt({
                name: "choice",
                type: "list",
                message: "What would you like to stock up on?",
                choices: itemList
            }).then(function(choice){
                choice = choice.choice;
                inquirer.prompt({
                    type: "input",
                    message: "How many would you like to add?",
                    name: "amount",
                    validate: function(name) {
                      return (!isNaN(name))
                    }
                }).then(function(ans){
                    num = ans.amount;
                    connection.query(
                        "SELECT * FROM products WHERE ?",
                        {
                            product_name: choice
                        }, 
                        function(err, res){
                        stock = parseInt(res[0].stock_quantity);
                        stock += parseInt(num);
                        var item = res[0].product_name;
                        connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                            stock_quantity: stock
                            },
                            {
                            product_name: item
                            }
                        ],function(err, res){
                            if (err) throw (err);
                            console.log("There are now " + stock + " " + choice + "s");
                            connection.end();
                            }
                        );
                    });
                    // adder();
                })
            })
        });
    }




function adder(){    
    connection.query(
        "SELECT * FROM products WHERE ?",
        {
            product_name: choice
        }, function(err, res){
        stock = parseInt(res[0].stock_quantity);
        stock += parseInt(num);
        var item = res[0].product_name;
        connection.query(
        "UPDATE products SET ? WHERE ?"
        [
            {
            stock_quantity: stock
            },
            {
            product_name: "Sneakers"
            }
        ],function(err, res){
            if (err) throw (err);
            console.log("There are now " + stock + " " + choice + "s");
            connection.end();
            }
        );
    });  
};
}
//Add new products to be listed with inventory
function addProd(){
    connection.connect(function(err) {
        if (err) throw err;
        console.log("connected as id " + connection.threadId);
        afterConnection();
      });
    function afterConnection() {
        inquirer.prompt({
            type:"input",
            message: "What would you like to add? (name, department, price, stock)",
            name: "product"
        }).then(function(r){
            var depart;
            var newR = r.product.split(", ")
            var name = newR[0];
            var depart = newR[1];
            var price = parseInt(newR[2]);
            var stock = parseInt(newR[3]);
            
            var values = [name, depart, price, stock];
            var row = `INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES(?,?,?,?)`;

            console.log(newR);
            connection.query(row, values, function(err, res){
                if (err) throw (err);
                console.log("woot");
            })
            connection.end();
        })
        

    }
};

