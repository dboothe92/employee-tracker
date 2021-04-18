const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./config/connection');

let roleArr = ['IT Lead', 'CX Lead', 'Dev Lead', 'Marketing Lead', 'Marketing Intern', 'SQL Developer', 'CX Rep', 'IT Tech'];
let departmentArr = ['Information Technology', 'Customer Service', 'Development', 'Marketing'];

//Asks user what they'd like to do
function beginPrompt() {
    inquirer
        .prompt ([
            {
                type: 'list',
                name: 'beginChoice',
                message: 'How would you like to proceed?',
                choices: [
                    'View all employees',
                    'View all departments',
                    'View all roles',
                    'Add an employee',
                    'Add a role',
                    'Add a department',
                    'Update an employee role',
                    'Quit'
                ]
            }
        ])
        .then((choice) => {
            switch (choice.beginChoice) {
                case 'View all employees':
                    allEmployees();
                    break;
                case 'View all departments':
                    allDepartments();
                    break;
                case 'View all roles':
                    allRoles();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Update an employee role':
                    updateEmployee();
                    break;
                case 'Quit': 
                    console.log('You have exited the tracker');
                    break;
            };
        });
};

//Function to show all employees
function allEmployees() {
    console.log('Now showing all employees');

    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, role.salary, department.name AS department,
                    CONCAT(e.first_name, ' ', e.last_name) AS manager 
                    FROM employee 
                    INNER JOIN role ON role.id = employee.role_id
                    INNER JOIN department ON department.id = role.department_id
                    LEFT JOIN employee e on employee.manager_id = e.id
                    ORDER BY employee.id;`                
    db.query(sql, (err, res) => {
        if (err) {
            console.log(err);
        };

        console.table(res);
        beginPrompt();
    });  
};

//Function to show all employees based on role in db
function allDepartments() {
    console.log('Now showing all departments');

    const sql = `SELECT * from department;`
    db.query(sql, (err, res) => {
        if (err) {
            console.log(err);
        }
        console.table(res);
        beginPrompt();
    });
};

//Function to show all employees based on their department in the db
function allRoles() {
    console.log('Now showing all roles');

    const sql = `SELECT role.*, department.name AS department
                    FROM role
                    LEFT JOIN department ON department.id = role.department_id;`
    db.query(sql, (err, res) => {
        if (err) {
            console.log(err);
        }
        console.table(res);
        beginPrompt();
    });
};

//Function to add an employee to the database
function addEmployee() {
    inquirer    
        .prompt([
            {
                type: 'input',
                name: 'addFirstName',
                message: 'What is the employees first name?',
                validate: function(data) {
                    if (!data) {
                        return false;
                    }
                    return true;
                }
            }, 
            {
                type: 'input',
                name: 'addLastName',
                message: 'What is the employees last name?',
                validate: function(data) {
                    if (!data) {
                        return false;
                    }
                    return true;
                }
            },
            {
                type: 'list',
                name: 'addRoleEmployee',
                message: 'What role will this employee have?',
                choices: roleArr
            },
            {
                type: 'input',
                name: 'addManager',
                message: 'Please enter the id for the employees manager',
                validate: function(data) {
                    if (!data) {
                        console.log('Please enter an id');
                        return false;
                    }
                    return true;
                }
            }
        ])
        .then(newEmployee => {
            const roleId = roleArr.indexOf(newEmployee.addRoleEmployee) + 1

            const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                            VALUES (?, ?, ?, ?);`
            const params = [newEmployee.addFirstName, newEmployee.addLastName, roleId, newEmployee.addManager]; 
            db.query(sql, params, (err, res) => {
                if (err) {
                    console.log(err);
                }
            });

            const sql2 = `SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, role.salary, department.name AS department,
                             CONCAT(e.first_name, ' ', e.last_name) AS manager 
                             FROM employee 
                             INNER JOIN role ON role.id = employee.role_id
                             INNER JOIN department ON department.id = role.department_id
                             LEFT JOIN employee e on employee.manager_id = e.id
                             ORDER BY employee.id;`
            db.query(sql2, (err, res) => {
                if (err) {
                    console.log(err);
                }
                console.table(res);
                beginPrompt();
            });
        });
};

//Function to update employee role
function updateEmployee() {
    inquirer    
        .prompt([
            {
                type: 'input',
                name: 'chooseEmployee',
                message: 'Please enter the employee ID',
                validate: function(data) {
                    if (!data) {
                        console.log('Enter an employee id');
                        return false;
                    }
                    return true;
                }
            },
            {
                type: 'list',
                name: 'updateRole',
                message: 'Please select the new role for the employee',
                choices: roleArr
            }
        ])
        .then(updatedData => {
            const roleId = roleArr.indexOf(updatedData.updateRole) + 1;

            const sql = `UPDATE employee
                            SET role_id = ?
                            WHERE id = ?;`
            const params = [roleId, updatedData.chooseEmployee];
            db.query(sql, params, (err, res) => {
                if (err) {
                    console.log(err);
                }
            });

            const sql2 = `SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, role.salary, department.name AS department,
                            CONCAT(e.first_name, ' ', e.last_name) AS manager 
                            FROM employee 
                            INNER JOIN role ON role.id = employee.role_id
                            INNER JOIN department ON department.id = role.department_id
                            LEFT JOIN employee e on employee.manager_id = e.id
                            WHERE employee.id = ?;`
            const params2 = [updatedData.chooseEmployee];
            db.query(sql2, params2, (err, res) => {
                if (err) {
                    console.log(err);
                }
                console.table(res);
                beginPrompt();
            })
            
        })
};

// Add Role
function addRole(){
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'newRole',
                message: 'Whate role would you like to add?',
                validat: function(data) {
                    if (!data) {
                        console.log('Please enter a role.');
                        return false;
                    }
                    return true;
                }
            },
            {
                type: 'input',
                name: 'newSalary',
                message: 'What is the role salary?',
                validate: function(data) {
                    if (!data) {
                        console.log('Please enter a salary');
                        return false;
                    }
                    return true;
                }
            },
            {
                type: 'list',
                name: 'roleDepartment',
                message: 'What department does this role belong to?',
                choices: departmentArr
            }
        ])
        .then(addRole => {
            const departmentId = departmentArr.indexOf(addRole.roleDepartment) + 1; 

            const sql = `INSERT INTO role (title, salary, department_id)  
                            VALUES (?, ?, ?);`;
            const params = [addRole.newRole, addRole.newSalary, departmentId]
            db.query(sql, params, (err, res) => {
                if(err) {
                    console.log(err);
                }
                roleArr.push(addRole.newRole);
                console.log(roleArr);
            });

            const sql2 = `SELECT role.*, department.name AS department
                            FROM role
                            LEFT JOIN department ON department.id = role.department_id;`
            db.query(sql2, (err, res) => {
                if (err) {
                    console.log(err);
                }
                console.table(res);
                beginPrompt();
            });
        });
};

//Function to add a department to the database
function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'newDepartment',
                message: 'What is the departments name?',
                validate: function(data) {
                    if (!data) {
                        console.log('Please enter a department');
                        return false;
                    }
                    return true;
                }
            }
        ])
        .then(deptInfo => {
            const sql = `INSERT INTO department (name)
                            VALUES (?);`
            const params = [deptInfo.newDepartment] 
            db.query(sql, params, (err, res) => {
                if (err) {
                    console.log(err);
                }
                departmentArr.push(deptInfo.newDepartment);
                console.log(departmentArr);
            });

            const sql2 = `SELECT * FROM department;`
            db.query(sql2, (err, res) => {
                if (err) {
                    console.log(err);
                }
                console.table(res);
                beginPrompt();
            });
        });
};

beginPrompt();
