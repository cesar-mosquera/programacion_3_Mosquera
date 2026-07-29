import { Controller, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { MovementDto } from './dto/movement.dto';
import { SuccessResponseDto } from '../common/dto/response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() dto: CreateProductDto) {
    const product = await this.productsService.create(dto);
    return new SuccessResponseDto('Producto registrado', product);
  }

  @Get()
  async findAll() {
    const products = await this.productsService.findAll();
    return new SuccessResponseDto('Lista de productos', products);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const product = await this.productsService.findOne(id);
    return new SuccessResponseDto('Producto encontrado', product);
  }

  @Put(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateProductDto) {
    const product = await this.productsService.update(id, dto);
    return new SuccessResponseDto('Producto actualizado', product);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.productsService.remove(id);
    return new SuccessResponseDto('Producto eliminado');
  }

  @Post(':id/sell')
  async sell(@Param('id', ParseUUIDPipe) id: string, @Body() dto: MovementDto) {
    const product = await this.productsService.sell(id, dto.quantity!);
    return new SuccessResponseDto('Venta realizada', product);
  }

  @Post(':id/restock')
  async restock(@Param('id', ParseUUIDPipe) id: string, @Body() dto: MovementDto) {
    const product = await this.productsService.restock(id, dto.quantity!);
    return new SuccessResponseDto('Abastecimiento realizado', product);
  }
}
