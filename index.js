const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

// Initialize an empty array to store employees
const employeesArr = [];

function startPrompt() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the employee's name?"
        },
        {
            type: 'list',
            name: 'role',
            message: "What is the employee's role?",
            choices: ['Manager', 'Engineer', 'Intern'],

        },
        {
            type: 'input',
            name: 'id',
            message: "What is the employee's ID?"
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the employee's email address?"
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "What is the manager's office number?",
            when: function (answers) {
                return answers.role === 'Manager';
            }
        },
        {
            type: 'input',
            name: 'github',
            message: "What is the engineer's GitHub username?",
            when: function (answers) {
                return answers.role === 'Engineer';
            }
        },
        {
            type: 'input',
            name: 'school',
            message: "What is the intern's school name?",
            when: function (answers) {
                return answers.role === 'Intern';
            }
        },
        {
            type: 'confirm',
            name: 'addMore',
            message: 'Would you like to add another employee?'
        }
    ]).then(function ({ name, role, id, email, officeNumber, github, school, addMore }) {
        let newMember;
        if (role === 'Manager') {
            newMember = new Manager(name, id, email, officeNumber);
        } else if (role === 'Engineer') {
            newMember = new Engineer(name, id, email, github);
        } else {
            newMember = new Intern(name, id, email, school);
        }
        employeesArr.push(newMember);
        if (addMore) {
            startPrompt();
        } else {
            console.log('Finished adding employees');
            console.log(employeesArr);

            // Generate HTML using employeesArr
            const html = writeHtml(employeesArr);

            // Write generated HTML content to a file
            fs.writeFile('team.html', html, (err) => {
                if (err) throw err;
                console.log('Successfully generated team.html');
            });
        }
    });
    }

              // Call a function to generate HTML using employeesArr
              function writeHtml(employeesArr) {
                return `
                <!DOCTYPE html>
 <html lang="en">
 <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Cinzel&family=Open+Sans:wght@300&display=swap" rel="stylesheet">
    <title>Team Profile Generator</title>
 </head>
 <body>
    <h1>Team Members</h1>
    <div class="grid text-center d-flex flex-row align-items-center" style="position:relative; min-height:85vh; padding-left: 45vh" >
        <div class="g-col-4" style="width: 15rem; opacity: 90%;  box-shadow: 1px 2px 3px 4px #c89f9c;"><strong>Manager</strong>
            <h2>Beatriz</h2>
            <p><strong>ID: </strong> 91128</p>
            <p><strong>Email: </strong>manager@bfr.com</p>
            <p><strong>Office: </strong> BFR Company</p>
        </div>
        <div class="g-col-4" style="width: 15rem; opacity: 90%;  box-shadow: 1px 2px 3px 4px #c89f9c;"><strong>Engineer</strong>
            <h2>Beatriz</h2>
            <p><strong>ID: </strong> 23983</p>
            <p><strong>Email: </strong>engineer@bfr.com</p>
            <p> <strong>Github: </strong> https://github.com/</p>
        </div>
        <div class="g-col-4" class="g-col-4" style="width: 15rem; opacity: 90%;  box-shadow: 1px 2px 3px 4px #c89f9c;"><strong>Intern</strong>
            <h2>Beatriz</h2>
            <p><strong>ID: </strong> 87345</p>
            <p><strong>Email:</strong> student12@msu.com</p>
            <p><strong>School: </strong>MSU</p>
        </div>
      </div>
      <footer>© 2023 All rights reserved by BFR Company</footer>
 </body>
 </html>
                `
              };
     
        // write de html file
        function writeToFile(fileName, data) {
            fs.writeFile(fileName, data, (err) => {
              if (err) throw err;
              console.log(`HTML file ${fileName} has been successfully generated!`);
            });
          }
        
        // function to begin prompting the user for employee details
        startPrompt();