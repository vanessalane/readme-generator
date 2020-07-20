
const inquirer = require("inquirer");
const fetch = require("node-fetch");
const fs = require("fs");
const generateMarkdown = require('./utils/generateMarkdown.js');

// function to write README file
function writeToFile(fileName, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(fileName, generateMarkdown(data), err => {
            if (err) {
                reject(err);
                return;
            };

            resolve({
                ok: true,
                message: `Successfully created your README, ${fileName}!`
            });
        });
    });
}

// function to initialize program
function init() {
    // get the commonly used licenses from GitHub
    fetch("https://api.github.com/licenses")
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(licenseData) {
                // create a question that prompts for the licenses
                const licensePrompt = {
                    type: 'list',
                    name: 'field',
                    message: `license:`,
                    choices: licenseData.map( license => license.name )
                }

                // add it to the questions array
                questions.push(licensePrompt);

                // start the prompt
                console.log(`
                    ==================================
                     Provide details for a new README
                    ==================================
                `);
                return inquirer.prompt(questions)
                    .then(responses => {
                        const projectName = `${responses.title}_README.md`;
                        return writeToFile(projectName, responses).then(writeFileResponse => {
                                console.log(writeFileResponse.message);
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    });
            })
        } else {
            console.log(`Licenses could not be loaded: ${err}`);
        }
    });
}

// function call to initialize program
init();
