import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Controller('authentication')
export class AuthenticationController {
  constructor(private userService: UsersService) {}

  @Post('/registration')
  @UsePipes(ValidationPipe)
  async signUp(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }
}
