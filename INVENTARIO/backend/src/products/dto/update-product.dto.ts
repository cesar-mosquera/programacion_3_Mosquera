import { IsString, IsNumber, IsOptional, Min, IsIn } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @Min(0.01)
  @IsOptional()
  price?: number;

  @IsString()
  @IsIn(['fisico', 'digital'])
  @IsOptional()
  type?: string;
}
