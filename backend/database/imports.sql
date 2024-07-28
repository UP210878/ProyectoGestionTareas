INSERT INTO category(userId,categoryName) VALUES (1,"CategoriaPrueba1");
INSERT INTO category(userId,categoryName) VALUES (1,"CategoriaPrueba2");
INSERT INTO category(userId,categoryName) VALUES (1,"CategoriaPrueba3");

INSERT INTO task(categoryId,taskName,dueDate) VALUES (1,"Tarea1",'2024-10-10');
INSERT INTO task(categoryId,taskName,dueDate) VALUES (1,"Tarea2",'2024-10-10');
INSERT INTO task(categoryId,taskName,dueDate) VALUES (3,"Tarea3",'2024-10-10');

INSERT INTO activity(taskId,completed,activityName) VALUES (1,true,"Actividad1");
INSERT INTO activity(taskId,completed,activityName,assignedUser) VALUES (1,false,"Actividad2",3);



INSERT INTO category(userId,categoryName) VALUES (2,"CategoriaPrueba5");