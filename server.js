const inquirer = require('inquirer');
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employee_tracker'
    }
);

const promptUser = [
    {
        type: 'list',
        name: 'prompt',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role']
    }
];

function employeeDatabase() {
    inquirer.prompt(promptUser).then((answers) => {
        switch (answers.prompt) {
            case 'View All Departments':
                viewAllDepartments();
                break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'Add A Department':
                addDepartment();
                break;
            case 'Add A Role':
                addRole();
                break;
            case 'Add An Employee':
                addEmployee();
                break;
            case 'Update An Employee Role':
                updateEmployee();
                break;
        }
    })
};

function viewAllDepartments() {

    // restart application
    employeeDatabase();
};

function viewAllRoles() {

    // restart application
    employeeDatabase();
};

function viewAllEmployees() {

    // restart application
    employeeDatabase();
};

function addDepartment() {

    // restart application
    employeeDatabase();
};

function addRole() {

    // restart application
    employeeDatabase();
};

function addEmployee() {

    // restart application
    employeeDatabase();
};

function updateEmployee() {

    // restart application
    employeeDatabase();
};