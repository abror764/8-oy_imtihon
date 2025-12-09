export declare class CreateUserDto {
    email: string;
    password: string;
    name?: string;
    role?: 'user' | 'seller' | 'admin';
}
