import { Product } from 'src/product/entities/product.entity'
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm'

@Entity({name:'Category'})
export class Category{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type:'varchar', length: 60})
    name: string

    @OneToMany(() => Product, (product) => product.category, {cascade: true})
    products: Product[]
}