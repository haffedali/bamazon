// var mysql = require("mysql");
// var inquirer = require("inquirer");
// var itemList = [];

// var connection = mysql.createConnection({
//   host: "localhost",

//   // Your port; if not 3306
//   port: 3306,

//   // Your username
//   user: "hoff",

//   // Your password
//   password: "",
//   database: "bamazon"
// });



// connection.connect(function(err) {
//   if (err) throw err;
//   firstStep();
// });


// function firstStep(){
//     connection.query(
//         "SELECT * FROM products", function(err, res){
//         if (err) throw (err);
//         for (var i=0; i<res.length; i++){
//             itemList.push(res[i].product_name);
//         }
//         inquirer.prompt({
//             name: "choice",
//             type: "list",
//             message: "What would you like to buy?",
//             choices: itemList
//         }).then(function(ans){
//             var item = ans.choice;
//             var amount;
//             connection.query("SELECT * FROM products WHERE ?",
//             {
//                 product_name: item
//             },
//             function(err, res){
//                 if (err) throw (err);
//                 console.log("We have " + res[0].stock_quantity + " in stock, costing " + res[0].price + " each.");
//                 var stock = res[0].stock_quantity;
//                 inquirer.prompt({
//                     name: "amount",
//                     type: "input",
//                     message: "How many do you want? (integer please)",
//                     validate: function(name){
//                         return (!isNaN(name) && name<stock);
//                     }

//                 }).then(function(ans){
//                     amount = ans.amount;
//                     stock = stock - amount;
//                     console.log("Thank you for your purchase!");
//                     connection.query(
//                         "UPDATE products SET ? WHERE ?",
//                         [
//                             {
//                                 stock_quantity: stock
//                             },
//                             {
//                                 product_name: item
//                             }
//                         ],
//                         function(err, res) {
//                             if (err) throw (err);
//                         }
//                     )
//                     connection.end();
//                 })
//             }
        
//         )
//         })
//     })
// }

let oat = () => {
    console.log('The')
}

oat();



let ace = [2, 2, 3]

ace.map((ac)=> {
    console.log(ac * 2)

});


(function() {
    console.log('The')
})();