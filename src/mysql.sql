CREATE DATABASE database_links;

CREATE TABLE users (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30) NOT NULL,
ruc VARCHAR(15),
phone VARCHAR(50),
email VARCHAR(50),
created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);