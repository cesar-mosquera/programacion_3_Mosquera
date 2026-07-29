import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async create(dto: CreateTransactionDto): Promise<Transaction> {
    const transaction = this.transactionRepository.create(dto);
    return this.transactionRepository.save(transaction);
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionRepository.find({
      order: { date: 'DESC' },
    });
  }

  async findByProduct(productId: string): Promise<Transaction[]> {
    return this.transactionRepository.find({
      where: { productId },
      order: { date: 'DESC' },
    });
  }
}
