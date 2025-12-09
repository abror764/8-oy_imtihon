import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: CreateUserDto): Promise<any>;
    login(dto: LoginDto): Promise<{
        access_token: string;
        user: any;
    } | {
        error: string;
    }>;
}
