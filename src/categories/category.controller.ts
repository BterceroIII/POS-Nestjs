import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { IdValidationPipe } from '../common/pipes/id-validation/id-validation.pipe';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService
  ) {}

  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto){
    return this.categoryService.createCategory(createCategoryDto)
  }

  @Get()
  async findAll(){
    return await this.categoryService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', IdValidationPipe) id: string){
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', IdValidationPipe) id: string,
         @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoryService.update(+id, updateCategoryDto)
  }

  @Delete(':id')
  remove(@Param('id', IdValidationPipe) id: string){
    return this.categoryService.remove(+id);
  }
}
