import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { Task } from './tasks/task.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      url: process.env.DATABASE_URL,
      // type: 'mongodb',
      // host: process.env.DATABASE_HOST || 'cluster0.qjk8yrn.mongodb.net',
      // port: 27017, // MongoDB Atlas uses 27017 internally, but it's not needed in SRV connections
      // username: process.env.DATABASE_USERNAME || 'mailboxrajeshkr',
      // password: process.env.DATABASE_PASSWORD || '<db_password>',
      // database: process.env.DATABASE_NAME || 'taskdb',
      authSource: process.env.DATABASE_AUTH_SOURCE || 'admin', // Needed for authentication
      useNewUrlParser: true,
      useUnifiedTopology: true,
      synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
      ssl: true, // Required for MongoDB Atlas
      retryWrites: true,
      w: 'majority',
      entities: [Task, User],
    }),
    TasksModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
