import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { TransactionsService } from '../transactions/transactions.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly transactionsService: TransactionsService,
  ) {}

  async create(dto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(dto);
    const saved = await this.productRepository.save(product);

    await this.transactionsService.create({
      productId: saved.id!,
      productName: saved.name!,
      action: 'Registro',
      detail: `Stock inicial: ${dto.stock} unidades a $${dto.price}`,
    });

    return saved;
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Producto no encontrado');
    return product;
  }

  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    const previousName = product.name;
    const previousPrice = product.price;

    Object.assign(product, dto);
    const updated = await this.productRepository.save(product);

    await this.transactionsService.create({
      productId: id,
      productName: updated.name!,
      action: 'Edición',
      detail: `Actualizado de "${previousName}" a "${updated.name}", Precio: $${previousPrice} -> $${updated.price}`,
    });

    return updated;
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);

    await this.transactionsService.create({
      productId: id,
      productName: product.name!,
      action: 'Eliminación',
      detail: `Producto eliminado del sistema (Stock restante: ${product.stock})`,
    });

    await this.productRepository.remove(product);
  }

  async sell(id: string, quantity: number): Promise<Product> {
    const product = await this.findOne(id);

    if (quantity <= 0) throw new BadRequestException('La cantidad a vender debe ser mayor a 0');
    if (quantity > product.stock!) {
      throw new BadRequestException(`Stock insuficiente. Solo quedan ${product.stock} unidades`);
    }

    product.stock! -= quantity;
    const updated = await this.productRepository.save(product);

    await this.transactionsService.create({
      productId: id,
      productName: product.name!,
      action: 'Venta',
      detail: `Salida de ${quantity} unidades (Nuevo stock: ${product.stock})`,
    });

    return updated;
  }

  async restock(id: string, quantity: number): Promise<Product> {
    const product = await this.findOne(id);

    if (quantity <= 0) throw new BadRequestException('La cantidad a abastecer debe ser mayor a 0');

    product.stock! += quantity;
    const updated = await this.productRepository.save(product);

    await this.transactionsService.create({
      productId: id,
      productName: product.name!,
      action: 'Abastecimiento',
      detail: `Ingreso de ${quantity} unidades (Nuevo stock: ${product.stock})`,
    });

    return updated;
  }
}
