
const inquirer = require("inquirer");
const fetch = require("node-fetch");
const fs = require("fs");
const generateMarkdown = require('./utils/generateMarkdown.js');

// define the prompts with type: input
const inputPrompts = [
    'title',
    'description',
    'installation_instructions',
    'usage_information',
    'contribution_guidelines',
    'testing_information',
    'github_username',
    'email'
]

// create the questions of type: input
const questions = inputPrompts.map( field => {
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
                    name: 'license',
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
                        // get the license key and add it to the response data
                        for (let i=0; i < licenseData.length; i++) {
                            if (responses.license === licenseData[i].name) {
                                let licenseBadgeMsg = licenseData[i].spdx_id;
                                licenseBadgeMsg = licenseBadgeMsg.split("-")[0];  // shields.io only needs the first part of the key to display the badge
                                responses.license_badge = licenseBadgeMsg;
                                break;
                            }
                        }
                        // write the file
                        const projectName = responses.title.split(" ").join("_").toLowerCase();
                        const fileName = `${projectName}_README.md`;
                        return writeToFile(fileName, responses).then(writeFileResponse => {
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
