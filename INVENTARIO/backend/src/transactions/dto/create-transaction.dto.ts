import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  productId?: string;

  @IsString()
  @IsNotEmpty()
  productName?: string;

  @IsString()
  @IsNotEmpty()
  action?: string;

  @IsString()
  @IsNotEmpty()
  detail?: string;
}
