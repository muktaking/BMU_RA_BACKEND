import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    getUserByEmail(email: string): Promise<any>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<{
        message: string;
    }>;
    deleteUser(id: number): Promise<{
        message: string;
        data: any;
    }>;
}
