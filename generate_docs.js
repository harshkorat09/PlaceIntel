const fs = require('fs');
const path = require('path');

const IGNORE_DIRS = ['node_modules', '.git', '.venv', 'dist', 'build', '.cache', 'presentation_build', 'uploads', 'vendor-artifact-tool'];

function getFiles(dir, files = []) {
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (!IGNORE_DIRS.includes(file)) {
        getFiles(fullPath, files);
      }
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

const rootDir = process.cwd();
const allFiles = getFiles(rootDir);

let treeStr = '';
const treeMap = {};

// Building tree string
const addPathToTree = (filePath) => {
  const parts = path.relative(rootDir, filePath).split(path.sep);
  let current = treeMap;
  for (const part of parts) {
    if (!current[part]) current[part] = {};
    current = current[part];
  }
};

allFiles.forEach(addPathToTree);

function printTree(node, indent = '', isLast = true) {
  let output = '';
  const keys = Object.keys(node);
  keys.forEach((key, index) => {
    const isNodeLast = index === keys.length - 1;
    const prefix = isNodeLast ? '└── ' : '├── ';
    output += `${indent}${prefix}${key}\n`;
    if (Object.keys(node[key]).length > 0) {
      output += printTree(node[key], indent + (isNodeLast ? '    ' : '│   '), false);
    }
  });
  return output;
}

const md = [];
md.push('# PLACEINTEL CURRENT IMPLEMENTATION');
md.push('\n## 2. COMPLETE PROJECT STRUCTURE\n');
md.push('```text\nPlaceIntel/\n' + printTree(treeMap) + '```\n');

// Then I will gather file inventory
md.push('\n## 3. COMPLETE FILE INVENTORY\n');
md.push('| File | Exact Path | Type | Purpose | Imported By | Imports | Used? | Status | Notes |');
md.push('|---|---|---|---|---|---|---|---|---|');
allFiles.forEach(f => {
  const relPath = path.relative(rootDir, f);
  const ext = path.extname(f);
  if (['.tsx', '.ts', '.js', '.jsx', '.py', '.prisma'].includes(ext)) {
    md.push(`| ${path.basename(f)} | ${relPath} | ${ext} | - | - | - | UNKNOWN | UNKNOWN | - |`);
  }
});

fs.writeFileSync('PLACEINTEL_CURRENT_IMPLEMENTATION.md', md.join('\n'));
