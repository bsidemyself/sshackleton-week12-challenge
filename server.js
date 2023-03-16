const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');
const fs = require('fs');


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'emm4Jean$',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
  );

  employeeSearch();


  function employeeSearch() {
    inquirer.prompt({
        name: "selection",
        type: "list",
        message: "Please choose from the following options:",
        choices:
        ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update employee role", "Quit"]
    })
    .then(function(answer) {
        console.log(answer);

    if (answer.selection === "View all departments") {
        seeAllDepts();
    }
    else if (answer.selection === "View all roles") {
        seeAllRoles();
    }
    else if (answer.selection === "View all employees") {
        seeAllEmployees();
    }
    else if (answer.selection === "Add a department") {
        newDept();
    }
    else if (answer.selection === "Add a role") {
        newRole();
    }
    else if (answer.selection === "Add an employee") {
        newEmployee();
    }
    else if (answer.selection === "Update employee role") {
        updateRole();
    }
    else if (answer.selection === "Quit") {
        quitApp();
    }
    else {
        connection.end();
    }
  });
  return;
  };

  function seeAllDepts() {
    db.query("SELECT * FROM department", function(err, result, fields) {
        if (err) throw err;
        console.table(result);
        employeeSearch();
    });
  };

  function seeAllRoles() {
    db.query("SELECT * FROM roles", function(err, result, fields) {
        if (err) throw err;
        console.table(result);
        employeeSearch();
    });
  };

  function seeAllEmployees() {
    db.query("SELECT * FROM employee", function(err, result, fields) {
        if (err) throw err;
        console.table(result);
        employeeSearch();
    });
  };

    function newDept() {
    inquirer.prompt([
        {
            name: "dept",
            type: "input",
            message: "Enter the name of the new department"
        }
    ]) .then (function(answer) {
        db.promise().query("INSERT INTO department (dept_name) VALUES (?)", [answer.dept] , function(err, res) {
            if (err) throw err;
            console.table(res)
        }) .then (employeeSearch);
        
        
    });
  };

   function newRole() {
    inquirer.prompt([
        {
            name: "role",
            type: "input",
            message: "Enter the name of the new role"
        },
        {
            name: "salary",
            type: "decimal",
            message: "Enter the new role's salary"
        },
        {
            name: "dept",
            type: "list",
            message: "Which department is the new role in? Sales(1), HR(2), Production(3), Management(4)",
            choices: [1, 2, 3, 4]
        }


    ]) .then(function(answer) {
        db.promise().query("INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)", [answer.role, answer.salary, answer.dept] , function(err, res) {
            if (err) throw err;
            console.table(res)
        }) .then (employeeSearch);
    });
   };

function newEmployee() {
    inquirer.prompt([
        {
            name: "first",
            type: "input",
            message: "Enter the employee's first name"
        },
        {
            name: "last",
            type: "input",
            message: "Enter the employee's last name"
        },
        {
            name: "role",
            type: "list",
            message: "What role will the employee have? Account Manager(1), Sales Assoc(2), Production Manager(3), Production Assoc(4), General Manager(5), Regional Manager(6)",
            choices: [1, 2, 3, 4, 5, 6]
        },
        {
            name: "manager",
            type: "boolean",
            message: "Is the new employee in management? Yes(1), No(0)"
        }

    ]) .then(function(answer) {
        db.promise().query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.first, answer.last, answer.role, answer.manager] , function(err, res) {
            if (err) throw err;
            console.table(res)
        }) .then (employeeSearch);
    });
   };

   function updateRole() {
    inquirer.prompt([
        {
            name: "empUpdate",
            type: "input",
            message: "Enter the last name of the employee to be updated"
        },
  
        {
            name: "roleUpdate",
            type: "input",
            message: "Enter the title of the new role for this employee"
        }
      ])
      .then(function(answer) {

        db.promise().query('UPDATE employee SET role_id=? WHERE last_name= ?',[answer.roleUpdate, answer.empUpdate],function(err, res) {
          if (err) throw err;
          console.table(res)
        }) .then (employeeSearch);
      });
  };

  app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  function quitApp() {
    console.log("Goodbye")
    db.end();
    process.exit();
  }