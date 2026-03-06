const http = require('http');

const treks = [
  "annapurna-base-camp-trek",
  "miyar-valley-trek",
  "tungnath-deoriatal-trek",
  "bajredara-trek",
  "hilley-versey-trek",
  "beas-kund-trek",
  "barafsar-lake-trek",
  "kashmir-great-lakes-trek",
  "sandakphu-trek",
  "bhrigu-lake-trek",
  "hampta-pass-trek",
  "triund-trek",
  "prashar-lake-trek",
  "roopkund-trek",
  "kedarkantha-trek",
  "kuari-pass-trek",
  "brahmtal-trek",
  "rupin-pass-trek",
  "dayara-bugyal-trek",
  "tarsar-marsar-trek"
];

let passed = 0;
let failed = 0;
let completed = 0;

function testTrek(slug) {
  return new Promise((resolve) => {
    const url = `http://localhost:3000/treks/${slug}`;
    const req = http.get(url, { timeout: 15000 }, (res) => {
      if (res.statusCode === 200) {
        console.log(`✓ ${slug}`);
        passed++;
      } else {
        console.log(`✗ ${slug} (${res.statusCode})`);
        failed++;
      }
      completed++;
      resolve();
    });
    
    req.on('error', (err) => {
      console.log(`✗ ${slug} (${err.message})`);
      failed++;
      completed++;
      resolve();
    });
    
    req.on('timeout', () => {
      console.log(`✗ ${slug} (timeout)`);
      req.destroy();
      failed++;
      completed++;
      resolve();
    });
  });
}

async function runTests() {
  console.log(`Testing ${treks.length} trek pages...\n`);
  
  for (const trek of treks) {
    await testTrek(trek);
  }
  
  console.log(`\n================================`);
  console.log(`Results: ${passed} passed, ${failed} failed`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests();
