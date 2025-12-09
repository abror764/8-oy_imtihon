import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private usersService;
    constructor(cfg: ConfigService, usersService: UsersService);
    validate(payload: any): Promise<{
        id: number;
        email: string;
        role: import("../users/user.entity").UserRole;
    }>;
}
export {};
