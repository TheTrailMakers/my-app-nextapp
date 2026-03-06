const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run(){
  try{
    const ex = await prisma.expedition.findMany({ take: 1 });
    console.log('OK', ex.length);
  }catch(e){
    console.error('PRISMA ERR', e.message);
  }finally{
    await prisma.$disconnect();
  }
}
run();
