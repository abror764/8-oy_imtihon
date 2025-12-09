export type UserRole = 'user' | 'seller' | 'admin';
export declare class User {
    id: number;
    email: string;
    password: string;
    name: string;
    role: UserRole;
    profileImage?: string;
    createdAt: Date;
    updatedAt: Date;
}
