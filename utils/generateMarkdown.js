// function to generate markdown for README
function generateMarkdown(data) {
  return `# ${data.title}

  ## Description
  ${data.description}
  
  ## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [Questions](#questions)

  ## Installation
  ${data.installation_instructions}
  
  ## Usage
  ${data.usage_information}
  
  ## License
  This application is covered under ${data.license}.
  
  ## Contributing
  ${data.contribution_guidelines}
  
  ## Tests
  ${data.testing_information}
  
  ## Questions
  Questions? Email ${data.email}.
`;
}

module.exports = generateMarkdown;
