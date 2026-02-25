import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  create(cat: CreateUserDto) {
    console.log(cat);
    // Query to create on Database
  }

  async findAll(): Promise<User[]> {
    const { rows } = await this.db.query(`
      SELECT * FROM users
    `);

    return rows as User[];
  }
}
