import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createInvoiceDto: CreateInvoiceDto) {
    return this.prisma.invoice.create({
      data: {
        ...createInvoiceDto,
        user_id: userId,
        due_date: new Date(createInvoiceDto.due_date),
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.invoice.findMany({
      where: { user_id: userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(userId: string, id: string) {
    const invoice = await this.prisma.invoice.findFirst({
      where: { id, user_id: userId },
    });

    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }

    return invoice;
  }

  async update(userId: string, id: string, updateInvoiceDto: UpdateInvoiceDto) {
    const invoice = await this.prisma.invoice.findFirst({
      where: { id, user_id: userId },
    });

    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }

    return this.prisma.invoice.update({
      where: { id },
      data: {
        ...updateInvoiceDto,
        due_date: updateInvoiceDto.due_date
          ? new Date(updateInvoiceDto.due_date)
          : undefined,
      },
    });
  }

  async remove(userId: string, id: string) {
    const invoice = await this.prisma.invoice.findFirst({
      where: { id, user_id: userId },
    });

    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }

    return this.prisma.invoice.delete({
      where: { id },
    });
  }
}
