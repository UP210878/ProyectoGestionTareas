CREATE DATABASE IF NOT EXISTS TODOAPP;

CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin';

GRANT ALL PRIVILEGES ON TODOAPP.* TO 'admin'@'localhost';

USE TODOAPP;

CREATE TABLE `user` (
    userId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(70) NOT NULL UNIQUE,
    password VARCHAR(70) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE category (
    categoryId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    categoryName VARCHAR(70) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT ct_id_u_fk FOREIGN KEY (userId)
    references user (userId)
);

CREATE TABLE task (
    taskId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    categoryId INT NOT NULL,
    taskName VARCHAR(70) NOT NULL,
    dueDate DATE,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT tk_id_c_fk FOREIGN KEY (categoryId)
    references category (categoryId)
);

CREATE TABLE activity (
    activityId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    taskId INT NOT NULL,
    assignedUser INT DEFAULT NULL,
    completed BOOLEAN DEFAULT FALSE,
    activityName VARCHAR(70) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT act_id_t_fk FOREIGN KEY (taskId)
    references task (taskId),
    CONSTRAINT act_id_u_fk FOREIGN KEY (assignedUser)
    references user (userId)
);

INSERT INTO category(userId,categoryName) VALUES (1,"CategoriaPrueba1");
INSERT INTO category(userId,categoryName) VALUES (1,"CategoriaPrueba2");
INSERT INTO category(userId,categoryName) VALUES (1,"CategoriaPrueba3");


INSERT INTO task(categoryId,taskName,dueDate) VALUES (1,"Tarea1",'2024-10-10');
INSERT INTO task(categoryId,taskName,dueDate) VALUES (1,"Tarea2",'2024-10-10');
INSERT INTO task(categoryId,taskName,dueDate) VALUES (3,"Tarea3",'2024-10-10');

INSERT INTO activity(taskId,completed,activityName) VALUES (1,true,"Actividad1");
INSERT INTO activity(taskId,completed,activityName,assignedUser) VALUES (1,false,"Actividad2",3);


INSERT INTO category(userId,categoryName) VALUES (2,"CategoriaPrueba5");