import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './interfaces/product.interface';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProductsService {
  constructor(private readonly db: DatabaseService) {}

  async create(product: CreateProductDto): Promise<Product> {
    const { rows } = await this.db.query(
      `
      INSERT INTO products (name, price, created_at)
      VALUES ($1, $2, $3)
      RETURNING *
    `,
      [product.name, product.price, product.created_at],
    );

    return rows[0] as Product;
  }

  async findAll(): Promise<Product[]> {
    const { rows } = await this.db.query(`
      SELECT * FROM products
    `);

    return rows as Product[];
  }

  async count(): Promise<number> {
    const { rows } = await this.db.query(`
      SELECT COUNT(*) as count FROM products
    `);

    return parseInt(String((rows[0] as { count: string | number }).count), 10);
  }
}
