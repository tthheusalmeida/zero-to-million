import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  create(cat: User) {
    // Query to create on Database
  }

  findAll(): User[] {
    // Query to return all users
  }
}
