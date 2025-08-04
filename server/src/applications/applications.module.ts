import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { Application, ApplicationSchema } from './application.model';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Application.name, schema: ApplicationSchema },
    ]),
    UsersModule,
    AuthModule,
  ],
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
  exports: [ApplicationsService],
})
export class ApplicationsModule {}
