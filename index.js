const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

//Creates connection to database
const db = mysql.createConnection(
    {
        host: 'localhost', 
        user: 'root',
        password: 'Batman5562',
        database: 'employeeTracker'
    }
);

//If database connects this will start the inquirer questions
db.connect((err) => {
    if(err) {
        console.log('Error: ' + err);
    }
    console.log("You are now connected to the 'employeeTracker' database");
    beginPrompt();
});

function beginPrompt() {
    inquirer
        .prompt ([
            {
                type: 'list',
                name: 'beginChoice',
                message: 'How would you like to proceed?',
                choices: [
                    'View all employees',
                    'View all employees based on department',
                    'View all employees based on role',
                    'Add an employee',
                    'Add a role',
                    'Add a department'
                ]
            }
        ])
        .then((choice) => {
            if (choice === 'View all employees') {
                allEmployees();
            } else if (choice === 'View all employees based on department') {
                allDepartments();
            } else if (choice === 'View all employees based on role') {
                allRoles();
            } else if ( choice === 'Add an employee') {
                addEmployee();
            } else if (choice === 'Add a role') {
                addRole();
            } else if (choice === 'Add department') {
                addDepartment();
            }
        })
}





