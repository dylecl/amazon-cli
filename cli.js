var inquirer = require("inquirer");
var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: 3306,
    database: "store"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}.`);
    starter()

});

var choice1;
var current = [];
var amount;
var stock;

function starter () {
current = [];

    inquirer.prompt([
        {
            type: "list",
            name: "filter",
            message: "What are you searching for?",
            choices: ["Home stuffs", "Food stuffs", "Fun stuffs", "Exit"]
        }
    ]).then(function(userAction) {
        choice1 = userAction.filter;
        // console.log(choice1)
        switch(userAction.filter) {
            case "Home stuffs":

            findItems(function() {
                home()
            })
            break;
            case "Food stuffs":
            
            findItems(function() {
                food()
            });
            break;
            case "Fun stuffs":

            findItems(function() {
                fun()
            })
            break;
            case "Exit":

            connection.end();
            break;
        };
    })
};


var findItems = function (callback) {
    connection.query("SELECT * FROM products WHERE ?",
    {
        category: choice1
    },
    function (err, res) {
        if (err) throw err;
        res.forEach(function(item) {
            current.push(item.NAME)
        });
        if (callback) {callback()};
    })
}
var findStock = function(callback) {
    connection.query("SELECT * FROM products WHERE ?", {
        NAME: item1
    }, function (err, res) {
        if (err) throw err;
        stock = res[0].stock;
        if (callback) {callback()}
    })
}


function home () {
    // asks what the person would like to shop for
    inquirer.prompt ([
        {
            type:"list",
            name:"items",
            message: "What would you like?",
            choices: current
        }
    ]).then(function(choice){
        // sets the item to item1
        var item1 = choice.items;
        connection.query("SELECT stock FROM products WHERE ?", 
        {
            NAME: item1
        },function(err,res) {
            if (err) throw err;
            stock = res[0].stock;
            inquirer.prompt([
                {
                    type: "input",
                    name: "productNum",
                    message: `How many ${item1} would you like? There are ${stock} available`
                }
            ]).then(function(num) {
                amount = num.productNum
                connection.query("SELECT price FROM products WHERE ?",
                {
                    NAME: item1
                },function(err, res) {
                    if (err) throw err;
                    console.log("\nAt $" + res[0].price + " for " + parseInt(amount) + " is " + (parseInt(amount)* res[0].price) + "\n");
                    inquirer.prompt ([
                        {
                            input: "confirm",
                            name: "confirm",
                            default: true,
                            message: `Are you sure you would like to purchase ${amount} of ${item1}`
                        }
                    ]).then(function(confirm) {
                        if (confirm.confirm && stock > amount) {
                        console.log(`\nyou have purchased ${amount} of ${item1}\n\n`);
                        connection.query(`UPDATE products SET stock = (${stock} - ${parseInt(amount)}) WHERE ?`, 
                        {
                            NAME: item1
                        },function(err, res) {
                            if (err) throw err;
                            // console.log(res.affectedRows + " records updated\n\n")
                            starter()
                        }
                        )   
                        } else {
                            console.log(`\nYou decided to not purchase ${item1}\n\n or there are not enough ${item1} in stock for your order\n\n`);
                            starter()
                        }
                        
                    })
                }
                )
            });



        })

    })
};

function fun () {
    // asks what the person would like to shop for
    inquirer.prompt ([
        {
            type:"list",
            name:"items",
            message: "What would you like?",
            choices: current
        }
    ]).then(function(choice){
        // sets the item to item1
        var item1 = choice.items;
        connection.query("SELECT stock FROM products WHERE ?", 
        {
            NAME: item1
        },function(err,res) {
            if (err) throw err;
            stock = res[0].stock;
            inquirer.prompt([
                {
                    type: "input",
                    name: "productNum",
                    message: `How many ${item1} would you like? There are ${stock} available`
                }
            ]).then(function(num) {
                amount = num.productNum
                connection.query("SELECT price FROM products WHERE ?",
                {
                    NAME: item1
                },function(err, res) {
                    if (err) throw err;
                    console.log("At $" + res[0].price + " for " + parseInt(amount) + " is " + (parseInt(amount)* res[0].price));
                    inquirer.prompt ([
                        {
                            input: "confirm",
                            name: "confirm",
                            default: true,
                            message: `Are you sure you would like to purchase ${amount} of ${item1}`
                        }
                    ]).then(function(confirm) {
                        if (confirm.confirm && stock > amount) {
                            console.log(`\nyou have purchased ${amount} of ${item1}\n\n`);                        connection.query(`UPDATE products SET stock = (${stock} - ${parseInt(amount)}) WHERE ?`, 
                        {
                            NAME: item1
                        },function(err, res) {
                            if (err) throw err;
                            // console.log(res.affectedRows + " records updated")
                            starter()
                        }
                        )   
                        } else {
                            console.log(`\nYou decided to not purchase ${item1}\n or there are not enough ${item1} in stock for your order\n\n`);
                            starter()
                        }
                        
                    })
                }
                )
            });



        })

    })
};
function food () {
    // asks what the person would like to shop for
    inquirer.prompt ([
        {
            type:"list",
            name:"items",
            message: "What would you like?",
            choices: current
        }
    ]).then(function(choice){
        // sets the item to item1
        var item1 = choice.items;
        connection.query("SELECT stock FROM products WHERE ?", 
        {
            NAME: item1
        },function(err,res) {
            if (err) throw err;
            stock = res[0].stock;
            inquirer.prompt([
                {
                    type: "input",
                    name: "productNum",
                    message: `How many ${item1} would you like? There are ${stock} available`
                }
            ]).then(function(num) {
                amount = num.productNum
                connection.query("SELECT price FROM products WHERE ?",
                {
                    NAME: item1
                },function(err, res) {
                    if (err) throw err;
                    console.log("At $" + res[0].price + " for " + parseInt(amount) + " is " + (parseInt(amount)* res[0].price));
                    inquirer.prompt ([
                        {
                            input: "confirm",
                            name: "confirm",
                            default: true,
                            message: `Are you sure you would like to purchase ${amount} of ${item1}`
                        }
                    ]).then(function(confirm) {
                        if (confirm.confirm && stock > amount) {
                        console.log(`\nyou have purchased ${amount} of ${item1}\n`);
                        connection.query(`UPDATE products SET stock = (${stock} - ${parseInt(amount)}) WHERE ?`, 
                        {
                            NAME: item1
                        },function(err, res) {
                            if (err) throw err;
                            // console.log(res.affectedRows + " records updated");
                            starter()
                        }
                        )   
                        } else {
                            console.log(`\nYou decided to not purchase ${item1}\n or there are not enough ${item1} in stock for your order\n\n`);
                            starter()
                        }
                        
                    })
                }
                )
            });



        })

    })
};