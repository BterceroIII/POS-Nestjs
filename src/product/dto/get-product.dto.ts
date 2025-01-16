import { IsNumberString, IsOptional } from 'class-validator';

export class GetProductDto {
  @IsOptional()
  @IsNumberString({}, { message: 'the category is must number' })
  category_id?: number;

  @IsOptional()
  @IsNumberString({}, { message: 'the quantity is must number' })
  take: number;

  @IsOptional()
  @IsNumberString({}, { message: 'the quantity is must number' })
  skip: number;
}
