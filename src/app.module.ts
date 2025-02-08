import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './categories/category.module';
import { typeOrmConfig } from './config/typeorm.config';
import { ProductoModule } from './product/product.module';
import { TransactionsModule } from './transactions/transactions.module';
import { CouponsModule } from './coupons/coupons.module';
import { Category } from './categories/entities/category.entity';
import { Product } from './product/entities/product.entity';
import { Transaction } from 'typeorm';
import { Coupon } from './coupons/entities/coupon.entity';
import { UploadImageModule } from './upload-image/upload-image.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: typeOrmConfig,
      inject: [ConfigService],
    }),
    CategoryModule,
    ProductoModule,
    TransactionsModule,
    CouponsModule,
    UploadImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
