import { IsString, IsNumber, IsNotEmpty, Min, IsIn } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsNumber()
  @Min(0.01)
  price?: number;

  @IsNumber()
  @Min(0)
  stock?: number;

  @IsString()
  @IsIn(['fisico', 'digital'])
  type?: string;
}
