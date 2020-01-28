import { message, danger, warn, markdown } from 'danger';

const fs = require('fs');

const modified = danger.git.modified_files.join('- ');
message('Changed files: \n- ' + modified);

const changes = danger.git.modified_files.reduce((prev, filePath) => {
  if (!prev.package) {
    prev.package = filePath.includes('package.json');
  }
  if (!prev.lock) {
    prev.lock = filePath.includes('package-lock.json');
  }
  return prev;
}, {});

if (changes.package && !changes.lock) {
  const message = 'Changes were made to package.json, but not to package-lock.json';
  const idea = 'Perhaps you need to run `npm install`?';
  warn(`${message} - <i>${idea}</i>`);
}

if (fs.existsSync('eslint.json')) {
  const eslintErrors = JSON.parse(fs.readFileSync('eslint.json'));
  const errors = eslintErrors.map(error => {
    const format = ':warning:';
    const linkToFile = danger.github.utils.fileLinks([error.filePath]);
    return error.messages.map(message => {
      return `* ${format} ${linkToFile} - ${message.message}`;
    });
  });

  const linkMarkdown = `
## ESLINT

${errors.flat().join('\n')}
`;

  markdown(linkMarkdown);
}
