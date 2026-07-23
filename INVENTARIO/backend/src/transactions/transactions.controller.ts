import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { SuccessResponseDto } from '../common/dto/response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  async findAll() {
    const transactions = await this.transactionsService.findAll();
    return new SuccessResponseDto('Historial de transacciones', transactions);
  }

  @Get('product/:productId')
  async findByProduct(@Param('productId') productId: string) {
    const transactions = await this.transactionsService.findByProduct(productId);
    return new SuccessResponseDto('Transacciones del producto', transactions);
  }
}
