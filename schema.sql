DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
    item_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(5,2) NOT NULL,
    stock_quantity INTEGER NOT NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Animal Crossing for Nintendo Switch", "Video Games", 60, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Skyrim", "Video Games", 50, 24);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Pineapple Juice", "Food", 5, 57);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Ruby Red Grapefruit Juice", "Food", 7.05, 113);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Goldfish Tumbler", "Kitchen", 19.99, 63);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Harry Potter Tumbler", "Kitchen", 19.99, 37);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Birthda Massacre", "Music", 9.99, 129);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Bella Morte", "Music", 9.99, 211);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Back scratcher", "Novelties", 3.50, 13);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("The Child plush", "toys", 39.99, 43);



