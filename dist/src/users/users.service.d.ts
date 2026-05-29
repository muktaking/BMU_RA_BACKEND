import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findUserByEmail(email: string): Promise<any>;
    createUser(createUser: CreateUserDto): Promise<User>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<{
        message: string;
    }>;
    deleteUser(id: number): Promise<{
        message: string;
        data: any;
    }>;
}
