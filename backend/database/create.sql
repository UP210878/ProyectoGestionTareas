CREATE TABLE user (
    userId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30),
    password VARCHAR(30)
);

CREATE TABLE category (
    categoryId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    categoryName VARCHAR(30) NOT NULL,
    CONSTRAINT ct_id_u_fk FOREIGN KEY (userId)
    references user (userId)
);

CREATE TABLE task (
    taskId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    categoryId INT NOT NULL,
    taskName VARCHAR(30) NOT NULL,
    dueDate DATE,
    completed BOOLEAN,
    CONSTRAINT tk_id_c_fk FOREIGN KEY (categoryId)
    references category (categoryId)
);

CREATE TABLE activity (
    activityId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    taskId INT NOT NULL,
    assignedUser INT NOT NULL,
    completed BOOLEAN,
    activityName VARCHAR(30) NOT NULL,
    CONSTRAINT act_id_t_fk FOREIGN KEY (taskId)
    references task (taskId),
    CONSTRAINT act_id_u_fk FOREIGN KEY (assignedUser)
    references user (userId)
);