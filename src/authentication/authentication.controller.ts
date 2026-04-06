import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthenticationService } from './authentication.service';
import { AuthDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/roles.decorator';
import { RolePermitted } from 'src/users/user.entity';
import { RolesGuard } from 'src/roles.guard';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private userService: UsersService,
    private authentcationService: AuthenticationService,
  ) {}

  @Post('/login')
  @UseGuards(AuthGuard('local'))
  async login(@Req() req, @Res({ passthrough: true }) res: Response) {
    const authResult = await this.authentcationService.authenticateUser(
      req.user,
    );
    const isProduction = process.env.NODE_ENV === 'production';

    res.cookie('access_token', authResult.accessToken, {
      httpOnly: isProduction, // True in production (HTTPS required)
      secure: process.env.NODE_ENV === 'production',
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    });

    return {
      message: 'Success',
      user: { id: authResult.id, role: req.user.role },
    };
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role(RolePermitted.member)
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    return { message: 'Logged out successfully' };
  }

  @Post('/registration')
  @UsePipes(ValidationPipe)
  async signUp(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }
}
