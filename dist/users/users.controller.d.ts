import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    all(): Promise<import("./user.entity").User[]>;
    update(id: string, body: any): Promise<import("./user.entity").User>;
}
