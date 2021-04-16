const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./config/connection');

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
                    'View all employees based on department',
                    'View all employees based on role',
                    'Add an employee',
                    'Add a role',
                    'Add a department',
                    'Quit'
                ]
            }
        ])
        .then((choice) => {
            switch (choice.beginChoice) {
                case 'View all employees':
                    allEmployees();
                    break;
                case 'View all employees based on department':
                    employeesByDepartment();
                    break;
                case 'View all employees based on role':
                    employeesByRole();
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
                case 'Quit': 
                    console.log('You have exited the tracker');
                    break;
            };
        });
};

//Function to show all employees
function allEmployees() {
    console.log('all employees');
    beginPrompt();
}

//Function to show all employees based on role in db
function employeesByDepartment() {
    console.log('employees by department');
    beginPrompt();
}

//Function to show all employees based on their department in the db
function employeesByRole() {
    console.log('employees by role')
    beginPrompt();
}

//Function to add an employee to the database
function addEmployee() {
    console.log('employee added');
    beginPrompt();
}

//Function to add a role to the database
function addRole() {
    console.log('role added');
    beginPrompt();
}

//Function to add a department to the database
function addDepartment() {
    console.log('department added');
    beginPrompt();
}

beginPrompt();
    







