import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './interfaces/order.interface';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class OrdersService {
  constructor(private readonly db: DatabaseService) {}

  async create(order: CreateOrderDto): Promise<Order> {
    const { rows } = await this.db.query(
      `
      INSERT INTO orders (user_id, product_id, quantity, unit_price, order_date)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `,
      [
        order.user_id,
        order.product_id,
        order.quantity,
        order.unit_price,
        order.order_date,
      ],
    );

    return rows[0] as Order;
  }

  async findAll(): Promise<Order[]> {
    const { rows } = await this.db.query(`
      SELECT * FROM orders
    `);

    return rows as Order[];
  }
}
