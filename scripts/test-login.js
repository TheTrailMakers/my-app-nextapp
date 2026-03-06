const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

(async ()=>{
  try{
    const user = await prisma.user.findUnique({ where: { email: 'admin@trailmakers.com' } });
    if(!user) return console.log('no user');
    console.log('user found id', user.id, 'isLocked', user.isLocked, 'isActive', user.isActive);
    const ok = await bcrypt.compare('Admin@123456', user.password);
    console.log('password match?', ok);
  }catch(e){
    console.error(e);
  }finally{ await prisma.$disconnect(); }
})();
