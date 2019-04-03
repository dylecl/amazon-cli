# bamazon-cli

This node-based app allows users to search through categories and find items they would like to buy. It displays current available stock, price, and total price. If a user confirms the purchase the MySQL database is modified to show the changes. 

to get the app up and running:
1. Navigate to the directory in bash
2. run an "npm install" to install node and any other npms required for this app.
3. finally run "node cli.js" in your bash terminal.


From here the app will ask what category of item the user is searching for.
After selecting the applicable category an array of items will be generated and displayed based on the category selected. After the user selects what item they would like they will be prompted to select a quantity they would like to order, if the order is for more than the stock contains the user will be informed. Else if the user is ordering a reasonable amount the application will ask the user to confirm the order. Upon confirmation the app updates the database and restarts over prompting the user to select the next category they would like to shop from or exit. 