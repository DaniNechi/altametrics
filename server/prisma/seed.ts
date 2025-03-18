import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create demo user
  const hashedPassword = await bcrypt.hash('demo123', 10);
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      password: hashedPassword,
      name: 'Demo User',
    },
  });

  // Create demo invoices
  const demoInvoices = [
    {
      customer_name: 'Acme Corp',
      description: 'Website Development',
      amount: 2500.00,
      due_date: new Date('2024-04-01'),
      status: 'pending',
      notes: 'Initial payment for website development project',
      user_id: demoUser.id,
    },
    {
      customer_name: 'TechStart Inc',
      description: 'Mobile App Design',
      amount: 3800.00,
      due_date: new Date('2024-04-15'),
      status: 'paid',
      notes: 'UI/UX design for mobile application',
      user_id: demoUser.id,
    },
    {
      customer_name: 'Global Solutions',
      description: 'Consulting Services',
      amount: 1200.00,
      due_date: new Date('2024-03-30'),
      status: 'pending',
      notes: 'Monthly consulting retainer',
      user_id: demoUser.id,
    },
  ];

  for (const invoice of demoInvoices) {
    await prisma.invoice.upsert({
      where: {
        id: invoice.user_id + invoice.customer_name,
      },
      update: {},
      create: invoice,
    });
  }

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 