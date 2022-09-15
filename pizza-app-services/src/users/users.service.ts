import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createuser.dto';
import { loginInterface } from './interfaces/login.interface';
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

  async loginUser(reqBody: loginInterface): Promise<any> {
    try {
      return await this.usersRepository
        .createQueryBuilder('users_ent')
        .select('users_ent.user_id')
        .addSelect('users_ent.name')
        .addSelect('users_ent.mobile_no')
        .where('users_ent.email=:client_email', { client_email: reqBody.email })
        .andWhere('users_ent.password=:client_pass', {
          client_pass: reqBody.password,
        })
        .getOneOrFail();
    } catch (err) {
      // console.log(err);
      return 'ERR';
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<users_ent> {
    return await this.usersRepository.save(createUserDto);
  }
}
