import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findUserByEmail(email: string): Promise<any>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<{
        message: string;
    }>;
    deleteUser(id: number): Promise<{
        message: string;
        data: any;
    }>;
}
