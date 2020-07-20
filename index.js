const inquirer = require("inquirer");
const fetch = require("node-fetch");
const fs = require("fs");

// define the project prompts with type: input
const inputProjectPrompts = [
    'title',
    'description',
    'installation_instructions',
    'usage_information',
    'contribution_guidelines',
    'testing_information',
    'github_username',
    'email'
]

const questions = inputProjectPrompts.map( field => {
    return {
        type: 'input',
        name: field,
        message: `${field.split("_").join(" ")}:`,
        validate: input => {
            if (input) {
                return true;
            } else {
                console.log(`${field} is required! `);
                return false;
            }
        }
    }
});

// function to write README file
function writeToFile(fileName, data) {

}

// function to initialize program
function init() {
    // get the commonly used licenses from GitHub
    fetch("https://api.github.com/licenses")
    .then(function(response) {
        if (response.ok) {
            response.json().then( function(data) {
                // create a question that prompts for the licenses
                const licensePrompt = {
                    type: 'list',
                    name: 'field',
                    message: `license:`,
                    choices: data.map( license => license.name )
                }

                // add it to the questions array
                questions.push(licensePrompt);

                // start the prompt
                console.log(`
                    ==================================
                     Provide details for a new README
                    ==================================
                `);
                return inquirer.prompt(questions).then(
                                        
                    data => {
                    const projectName = `${data['project title']}_README.md`;
                    writeToFile(projectName, data);
                });
            })
        } else {
            console.log(`Licenses could not be loaded: ${err}`);
        }
    });
}

// function call to initialize program
init();
