import { message, danger, warn, schedule } from 'danger';
import eslint from "@eaze/danger-plugin-eslint";

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

schedule(eslint());