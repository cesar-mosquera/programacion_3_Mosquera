import { IsNumber, IsNotEmpty, Min } from 'class-validator';

export class MovementDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  quantity?: number;
}
