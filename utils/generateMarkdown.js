// function to generate markdown for README
function generateMarkdown(data) {
  return `# ${data.title}
  
  ![License](https://img.shields.io/badge/label-${data.license_badge}-informational.svg)

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
  Have questions? Contact the developer at ${data.email} or [check out their GitHub profile](https://github.com/${data.github_username}).
`;
}

module.exports = generateMarkdown;
