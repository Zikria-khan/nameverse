const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const target = path.join(__dirname, '..', 'src', 'app', 'names', '[religion]', 'letter', '[letter]', 'NameClientComponent.jsx');
let src;
try {
  src = fs.readFileSync(target, 'utf8');
} catch (err) {
  process.exit(2);
}
try {
  parser.parse(src, {
    sourceType: 'module',
    plugins: ['jsx', 'classProperties', 'optionalChaining', 'nullishCoalescingOperator'],
  });
} catch (err) {
  if (err.loc) {
  }
  process.exit(1);
}
