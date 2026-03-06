const http = require('http');
const {PrismaClient} = require('@prisma/client');

const p = new PrismaClient();

p.trek.findMany({select: {slug: true}}).then(async (treks) => {
  console.log(`Testing all ${treks.length} trek pages...\n`);
  
  let passed = 0;
  let failed = 0;

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
        resolve();
      });
      
      req.on('error', (err) => {
        console.log(`✗ ${slug} (${err.message})`);
        failed++;
        resolve();
      });
      
      req.on('timeout', () => {
        console.log(`✗ ${slug} (timeout)`);
        req.destroy();
        failed++;
        resolve();
      });
    });
  }

  for (const trek of treks) {
    await testTrek(trek.slug);
  }
  
  console.log(`\n================================`);
  console.log(`Results: ${passed} passed, ${failed} failed out of ${treks.length}`);
  
  if (failed === 0) {
    console.log(`\n✅ SUCCESS! All ${treks.length} trek pages are online and accessible!`);
  }
  
  process.exit(failed > 0 ? 1 : 0);
});
