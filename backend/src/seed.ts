import prisma from './lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  const email = 'admin@msgdrop.com';
  const password = 'admin';

  // Check if it already exists
  let user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    user = await prisma.user.create({
      data: {
        email,
        password_hash,
        first_name: 'Demo',
        last_name: 'Admin',
      },
    });
    console.log(`Created demo user: ${email} / ${password}`);
  } else {
    console.log(`Demo user already exists: ${email} / ${password}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
