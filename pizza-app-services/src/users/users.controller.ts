import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { loginInterface } from './interfaces/login.interface';
import { UserInterface } from './interfaces/users.interface';
import { users_ent } from './users.entity';
import { UsersService } from './users.service';

@Controller('auth')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(): Promise<users_ent[]> {
    return await this.usersService.findAll();
  }

  @Post('/login')
  async login(@Body() reqBody: loginInterface, @Res() response: Response) {
    const user_found = await this.usersService.loginUser(reqBody);
    if (user_found === 'ERR')
      return response
        .status(HttpStatus.UNAUTHORIZED)
        .send('The user email or password is incorrect.');
    else {
      return response
        .status(HttpStatus.OK)
        .send({ msg: 'User verified successfully!!', data: user_found });
    }
  }

  @Post('/register')
  async createUser(@Body() user_obj: UserInterface, @Res() response: Response) {
    const client_data = await this.usersService.createUser(user_obj);
    delete client_data.password;
    return response
      .status(HttpStatus.CREATED)
      .send({ msg: 'User registered succesfully!!', data: client_data });
  }
}
