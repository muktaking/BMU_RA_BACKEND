import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import * as config from 'config';
import { jwtPayload } from './jwt.interface';

const jwtConfig = config.get('jwt');

@Injectable()
export class AuthenticationService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);
    if (user) {
      try {
        const isPasswordMatched = await compare(password, user.password);
        if (isPasswordMatched) return { id: user.id, role: user.role, email };
      } catch (error) {
        throw new InternalServerErrorException();
      }
    }

    return null;
  }

  async authenticateUser(user: jwtPayload) {
    const payload: jwtPayload = {
      email: user.email,
      id: user.id,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      id: user.id,
      expireIn: process.env.JWT_EXPIRESIN || jwtConfig.expiresIn,
    };
  }
}
