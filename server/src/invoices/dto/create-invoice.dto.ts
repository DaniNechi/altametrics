import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CreateInvoiceDto {
  @IsString()
  customer_name: string;

  @IsString()
  description: string;

  @IsNumber()
  amount: number;

  @IsDateString()
  due_date: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  notes?: string;
} 