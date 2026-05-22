const fs = require('fs');
const path = require('path');

const target = path.join(process.cwd(), '.next');

try {
  if (fs.existsSync(target)) {
    fs.rmSync(target, { recursive: true, force: true });
    console.log('Removed .next');
  } else {
    console.log('.next not found; nothing to clean');
  }
  process.exit(0);
} catch (err) {
  console.error('Failed to remove .next:', err);
  process.exit(1);
}
