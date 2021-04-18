INSERT INTO department (name) 
    VALUES
        ('Information Tech'),
        ('Customer Experience'),
        ('Development'),
        ('Marketing');

INSERT INTO role (title, salary, department_id)
    VALUES  
        ('IT Lead', 80000, 1),
        ('CX Lead', 81000, 2),
        ('DEV Lead', 1000000, 3),
        ('Marketing Lead', 5, 4),
        ('Marketing Intern', 0, 4),
        ('SQL Developer', 500000, 3),
        ('CX Rep', 30000, 2),
        ('IT Tech', 40000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES  
        ('Abby', 'Alister', 4, null), /*Marketing Lead*/
        ('Bobert', 'Banister', 3, null), /*DEV Lead*/
        ('Carly', 'Charcuterie', 2, null), /*CX Lead*/
        ('Dinosaur', 'Danger', 1, null), /*IT Lead*/
        ('Eric', 'Eragon', 5, 4), /*Marketing Intern*/
        ('Fiona', 'Fasbender', 6, 3), /*SQL Developer*/
        ('Gary', 'Godzilla', 7, 2), /*CX Rep*/
        ('Henrietta', 'Hayward', 8, 1); /*IT Tech*/

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;