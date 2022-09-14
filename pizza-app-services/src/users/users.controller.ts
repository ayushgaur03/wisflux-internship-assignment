import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UserInterface } from './interfaces/users.interface';
import { users_ent } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(): Promise<users_ent[]> {
    return await this.usersService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async createUser(@Body() user_obj: UserInterface) {
    const data = await this.usersService.createUser(user_obj);
    delete data.password;
    return { msg: 'You have succesfully created the user!!', data: data };
  }
}
