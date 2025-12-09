import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<{
        id: number;
        email: string;
        name: string;
        role: import("../users/user.entity").UserRole;
        profileImage?: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(user: any): Promise<{
        access_token: string;
        user: any;
    }>;
    register(dto: CreateUserDto): Promise<any>;
}
