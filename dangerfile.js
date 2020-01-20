import { message, danger } from 'danger';

const modified = danger.git.modified_files.join('- ');
message('Changed files: \n- ' + modified);
