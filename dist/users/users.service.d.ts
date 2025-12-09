import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private repo;
    constructor(repo: Repository<User>);
    create(dto: CreateUserDto): Promise<any>;
    findByEmail(email: string): Promise<User>;
    findById(id: number): Promise<User>;
    all(): Promise<User[]>;
    update(id: number, partial: Partial<User>): Promise<User>;
}
