import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from '../categories/entities/category.entity';
import { UploadImageModule } from 'src/upload-image/upload-image.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category]), UploadImageModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductoModule {}
