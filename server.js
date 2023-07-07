const inquirer = require('inquirer');
const mysql = require('mysql2');
const utils = require("util");

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employee_tracker'
    }
);

db.query = utils.promisify(db.query);

const promptUser = [
    {
        type: 'list',
        name: 'prompt',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role']
    }
];

// Initialize application
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

// Functions for specific actions based on user input in employeeDatabase()
function viewAllDepartments() {
    db.query("SELECT * FROM departments", (err, result) => {
        if (err) throw err;
        console.log("Viewing all Departments:");
        console.table(result);
        // restart application
        employeeDatabase();
    })
};

function viewAllRoles() {
    db.query("SELECT roles.id, roles.title, roles.salary, departments.name AS 'department name' FROM roles JOIN departments ON departments.id = roles.department_id", (err, result) => {
        if (err) throw err;
        console.log("Viewing all Roles:");
        console.table(result);
        // restart application
        employeeDatabase();
    })
};

function viewAllEmployees() {
    const sql = `SELECT employees.id, employees.first_name AS "first name", employees.last_name 
                    AS "last name", roles.title, departments.name AS department, roles.salary, 
                    concat(manager.first_name, " ", manager.last_name) AS manager
                    FROM employees
                    LEFT JOIN roles
                    ON employees.role_id = roles.id
                    LEFT JOIN departments
                    ON roles.department_id = departments.id
                    LEFT JOIN employees manager
                    ON manager.id = employees.manager_id`
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log("Viewing all Employees:");
        console.table(result);
        // restart application
        employeeDatabase();
    })
};

function addDepartment() {
    inquirer.prompt({
        type: "input",
        name: "addedDepartment",
        message: "Enter the name of the new department:",
    }).then((answer => {
        db.query(`INSERT INTO departments (name) VALUES ("${answer.addedDepartment}")`, (err, result) => {
            if (err) throw err;
                console.log(`Added department ${answer.addedDepartment} to the database!`);
                // restart application
                employeeDatabase();
        })
    }))
};

async function addRole() {
    const departments = await db.query('SELECT id as value, name AS name FROM departments')
    inquirer.prompt([
        {
            type: "input",
            name: "addedRoleName",
            message: "Enter the name of the new role:",
        },
        {
            type: "input",
            name: "addedRoleSalary",
            message: "Enter the salary of the new role:",
        },
        {
            type: "list",
            name: "selectDepartment",
            message: "Choose the department of the new role:",
            choices: departments
        },
    ]).then((answer => {
        db.query(`INSERT INTO roles (title, salary, department_id) VALUES ("${answer.addedRoleName}", "${answer.addedRoleSalary}", "${answer.selectDepartment}")`, (err, result) => {
            if (err) throw err;
                console.log(`Added role to the database!`);
                // restart application
                employeeDatabase();
        })
    }))
};

async function addEmployee() {
    const roles = await db.query('SELECT id as value, title AS name FROM roles');
    const managers = await db.query('SELECT id as value, concat(first_name, " ", last_name) AS name FROM employees');
    inquirer.prompt([
        {
            type: "input",
            name: "addedEmpFirName",
            message: "Enter the first name of the new employee:",
        },
        {
            type: "input",
            name: "addedEmpLastName",
            message: "Enter the last name of the new employee:",
        },
        {
            type: "list",
            name: "addedEmpRole",
            message: "Enter the role of the new employee:",
            choices: roles
        },
        {
            type: "list",
            name: "addedEmpManager",
            message: "Choose the manager of the new employee:",
            choices: managers
        },
    ]).then((answer => {
        db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${answer.addedEmpFirName}", "${answer.addedEmpLastName}", "${answer.addedEmpRole}", "${answer.addedEmpManager}")`, (err, result) => {
            if (err) throw err;
                console.log(`Added employee to the database!`);
                // restart application
                employeeDatabase();
        })
    }))
};

async function updateEmployee() {
    const roles = await db.query('SELECT id as value, title AS name FROM roles');
    const employees = await db.query('SELECT id as value, concat(first_name, " ", last_name) AS name FROM employees');
    console.log(roles);
    inquirer.prompt([{
        type: "list",
        name: "updateEmp",
        message: "Select the employee to update:",
        choices: employees
    },
    {
        type: "list",
        name: "role",
        message: "Select the new role of the employee to update:",
        choices: roles
    }]
    ).then((answer => {
        console.log(answer);
        db.query(`UPDATE employees SET role_id = ("${answer.role}") WHERE id = "${answer.updateEmp}"`, (err, result) => {
            if (err) throw err;
                console.log(`Updated employee on the database!`);
                // restart application
                employeeDatabase();
        })
    }))
};

employeeDatabase();