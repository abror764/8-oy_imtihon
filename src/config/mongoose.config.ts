import { Injectable } from '@nestjs/common';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private config: ConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.config.get('MONGODB_URI', 'mongodb://localhost:27017/shopmongo'),
      
    };
  }
}