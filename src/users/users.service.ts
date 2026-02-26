import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  async create(user: CreateUserDto): Promise<User> {
    const { rows } = await this.db.query(
      `
      INSERT INTO users (name, email, created_at)
      VALUES ($1, $2, $3)
      RETURNING *
    `,
      [user.name, user.email, user.created_at],
    );

    return rows[0] as User;
  }

  async findAll(): Promise<User[]> {
    const { rows } = await this.db.query(`
      SELECT * FROM users
    `);

    return rows as User[];
  }

  async count(): Promise<number> {
    const { rows } = await this.db.query(`
      SELECT COUNT(*) as count FROM users
    `);

    return parseInt(String((rows[0] as { count: string | number }).count), 10);
  }
}
