import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  create(cat: CreateUserDto) {
    console.log(cat);
    // Query to create on Database
  }

  findAll() {
    // Query to return all users
  }
}
