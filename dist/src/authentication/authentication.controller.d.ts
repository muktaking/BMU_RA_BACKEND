import { Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthenticationService } from './authentication.service';
export declare class AuthenticationController {
    private userService;
    private authentcationService;
    constructor(userService: UsersService, authentcationService: AuthenticationService);
    login(req: any, res: Response): Promise<{
        message: string;
        user: {
            id: number;
            role: any;
        };
    }>;
    logout(res: Response): Promise<{
        message: string;
    }>;
    signUp(createUserDto: CreateUserDto): Promise<import("src/users/user.entity").User>;
}
