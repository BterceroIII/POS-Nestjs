import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const category = await this.categoryRepository.findOneBy({
      id: createProductDto.categoryId,
    });

    if (!category) {
      let errors: string[] = [];
      errors.push('The category is not exist');
      throw new NotFoundException(errors);
    }
    return this.productRepository.save({
      ...createProductDto,
      category,
    });
  }

  async findAll(categoryId: number, take: number, skip: number) {
    const options: FindManyOptions<Product> = {
      relations: {
        category: true,
      },
      order: {
        id: 'DESC',
      },
      take,
      skip,
    };
    if (categoryId) {
      options.where = {
        category: {
          id: categoryId,
        },
      };
    }

    const [products, total] =
      await this.productRepository.findAndCount(options);
    return {
      products,
      total,
    };
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
      relations: {
        category: true,
      },
    });

    if (!product) {
      throw new NotFoundException('This product is not exist');
    }

    return product;
  }

  async update(id: number, updateProductoDto: UpdateProductDto) {
    const product = await this.findOne(id);
    Object.assign(product, updateProductoDto);

    if (updateProductoDto.categoryId) {
      const category = await this.categoryRepository.findOneBy({
        id: updateProductoDto.categoryId,
      });

      if (!category) {
        let errors: string[] = [];
        errors.push('The category is not exist');
        throw new NotFoundException(errors);
      }

      product.category = category;
    }

    return await this.productRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    await this.productRepository.delete(product);
    return { message: `remove a #${product.productName} product` };
  }
}
