const { execSync } = require('child_process');

console.log('Querying documents...');
const output = execSync(`npx sanity@3 documents query "*[_type in ['service', 'package', 'stat', 'testimonial']]"`, { encoding: 'utf8' });
const docs = JSON.parse(output);

const ids = docs.map(d => d._id);

if (ids.length > 0) {
  console.log(`Deleting ${ids.length} documents...`);
  // Break into chunks of 10 to avoid command line length limits
  for (let i = 0; i < ids.length; i += 10) {
    const chunk = ids.slice(i, i + 10);
    execSync(`npx sanity@3 documents delete ${chunk.join(' ')}`, { stdio: 'inherit' });
  }
  console.log('All duplicates deleted!');
} else {
  console.log('No documents found to delete.');
}
