import {
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'Value is no valid' })
  @MaxLength(60)
  @IsNotEmpty({ message: 'the product name is required' })
  productName: string;

  @IsString({ message: 'Value is no valid' })
  @MaxLength(120)
  @IsNotEmpty({ message: 'the description name is required' })
  description: string;

  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Price not valid' })
  @IsNotEmpty({ message: 'the price is required' })
  price: number;

  @IsNotEmpty({ message: 'the quantity is required' })
  @IsNumber({ maxDecimalPlaces: 0 }, { message: 'quantity not valid' })
  inventory: number;

  @IsNotEmpty({ message: 'the category is required' })
  @IsInt({ message: 'the category is not valid' })
  categoryId: number;
}
