import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtPayload } from './jwt.interface';
export declare class AuthenticationService {
    private userService;
    private jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<{
        id: any;
        role: any;
        email: string;
    } | null>;
    authenticateUser(user: jwtPayload): Promise<{
        accessToken: string;
        id: number;
        expireIn: string | undefined;
    }>;
}
