import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSession } from '@thallesp/nestjs-better-auth';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    getUserByEmail(session: UserSession): Promise<import("./user.entity").User>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<{
        message: string;
    }>;
    deleteUser(id: number): Promise<{
        message: string;
        data: import("typeorm").DeleteResult;
    }>;
}
