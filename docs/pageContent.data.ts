import { log } from 'console';
import fs from 'fs';
import path from 'path';

const docsDir = path.join(__dirname, './');

function getFilesContent(dir: string): Record<string, Map<number, string>> {

  const result: Record<string, Map<number, string>> = {};
  const folders = fs.readdirSync(docsDir).filter(file => file !=='public' && fs.statSync(path.join(docsDir, file)).isDirectory());

  folders.forEach(folder => {
    let fileNum = 0;
    const mdDir = path.join(dir, folder);
    const files = fs.readdirSync(mdDir).filter(file => file !== 'index.md' && file.endsWith('.md'));

    files.forEach(file => {
      const filePath = path.join(mdDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const jsonString = fileContent.trim();

      result[folder.replace(/^\d+\s*-\s*/, '')] = result[folder.replace(/^\d+\s*-\s*/, '')] || {};
      result[folder.replace(/^\d+\s*-\s*/, '')][fileNum] = JSON.parse(jsonString);
      fileNum = fileNum + 1;
    }
    );
  }
  );
  return result;
}

export default {
  load() {
    return getFilesContent(docsDir);
  }
};