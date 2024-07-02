CREATE DATABASE IF NOT EXISTS TODOAPP;

drop user 'admin'@'localhost';

CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin';

GRANT ALL PRIVILEGES ON TODOAPP.* TO 'admin'@'localhost';

USE TODOAPP;