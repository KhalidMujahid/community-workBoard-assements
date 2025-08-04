import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { ApplicationsModule } from './applications/applications.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.url'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    TasksModule,
    ApplicationsModule,
  ],
})
export class AppModule {}
