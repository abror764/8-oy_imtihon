import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
export declare class TypeOrmConfigService implements TypeOrmOptionsFactory {
    private config;
    constructor(config: ConfigService);
    createTypeOrmOptions(): TypeOrmModuleOptions;
}
