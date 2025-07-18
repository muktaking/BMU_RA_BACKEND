import {
  HttpCode,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthenticationService } from '../authentication.service';
import { AuthDto } from '../dto/auth.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthenticationService) {
    super({ usernameField: 'email' });
  }

  validate(email: string, password: string): Promise<any> {
    const user = this.authService.validateUser(email, password);
    if (!user) {
      throw new HttpException(
        'Email address or Password may be incorrect.',
        401,
      );
    }

    return user;
  }
}
