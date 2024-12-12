import { HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category) 
        private readonly categoryRepository: Repository<Category>
    ){}

    createCategory(createCategoryDto: CreateCategoryDto){
        return this.categoryRepository.save(createCategoryDto);
    }

    findAll(){
        return this.categoryRepository.find()
    }

    async findOne(id: number){
        const category = await this.categoryRepository.findOneBy({id: id})
        if(!category) 
            throw new NotFoundException('This category is not exist');
        return category;
    }

     async update(id: number, updateCategoryDto: UpdateCategoryDto){
        const category = await this.findOne(id);
        category.name = updateCategoryDto.name;
        return await this.categoryRepository.save(category);
    }

    async remove(id: number){
        const category = await this.findOne(id);
        await this.categoryRepository.remove(category);
        return `Categoria ${category} Eliminada`
    }

}
