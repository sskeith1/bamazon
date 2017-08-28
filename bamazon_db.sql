DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;


CREATE TABLE products (
  item_id INT(11) NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(9,2) NOT NULL,
  stock_quantity INT(9) UNSIGNED NOT NULL,
  PRIMARY KEY (item_id)
);


SELECT * FROM bamazon_db.products;