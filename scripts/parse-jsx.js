const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const target = path.join(__dirname, '..', 'src', 'app', 'names', '[religion]', 'letter', '[letter]', 'NameClientComponent.jsx');
let src;
try {
  src = fs.readFileSync(target, 'utf8');
} catch (err) {
  console.error('FILE_ERROR', err.message);
  process.exit(2);
}
try {
  parser.parse(src, {
    sourceType: 'module',
    plugins: ['jsx', 'classProperties', 'optionalChaining', 'nullishCoalescingOperator'],
  });
  console.log('PARSE_OK');
} catch (err) {
  console.error('PARSE_ERROR', err.message);
  if (err.loc) {
    console.error('line', err.loc.line, 'column', err.loc.column);
  }
  process.exit(1);
}
