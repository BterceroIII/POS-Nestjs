import { Product } from '../../product/entities/product.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'transactions' })
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', name: 'total' })
  total: number;

  @Column({ type: 'varchar', length: 30, nullable: true, name: 'coupon' })
  coupon: string;

  @Column({ type: 'decimal', nullable: true, name: 'discount' })
  discount: number;

  @Column({
    type: 'timestamp',
    name: 'transaction_date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  transactionDate: Date;

  @OneToMany(
    () => TransactionContents,
    (transactionContents) => transactionContents.transaction,
  )
  contents: TransactionContents[];
}

@Entity({ name: 'transactions_contents' })
export class TransactionContents {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', name: 'quantity' })
  quantity: number;

  @Column({ type: 'decimal', name: 'price' })
  price: number;

  @ManyToOne(() => Product, (product) => product.id, {
    eager: true,
    cascade: true,
  })
  product: Product;

  @ManyToOne(() => Transaction, (transaction) => transaction.contents, {
    cascade: true,
  })
  transaction: Transaction;
}
