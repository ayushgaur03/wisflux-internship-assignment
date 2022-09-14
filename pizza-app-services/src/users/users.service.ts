import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createuser.dto';
import { users_ent } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(users_ent)
    private readonly usersRepository: Repository<users_ent>,
  ) {}

  async findAll(): Promise<users_ent[]> {
    return await this.usersRepository.find();
  }

  async createUser(createUserDto: CreateUserDto): Promise<users_ent> {
    return await this.usersRepository.save(createUserDto);
  }
}
