import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Request,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/users.model';
import { RolesGuard } from '../common/guards/roles.guard';
import type { UserRequest } from '../common/interfaces/user-request.interface';

@Controller('tasks/:id')
@UseGuards(JwtAuthGuard)
export class ApplicationsController {
  constructor(private applicationsService: ApplicationsService) {}

  @Post('apply')
  @Roles(UserRole.Volunteer)
  @UseGuards(RolesGuard)
  async apply(
    @Param('id') taskId: string,
    @Body('message') message: string,
    @Request() req: UserRequest,
  ) {
    return this.applicationsService.create(taskId, req.user._id, message);
  }

  @Get('applications')
  @Roles(UserRole.Contributor)
  @UseGuards(RolesGuard)
  async getApplications(@Param('id') taskId: string) {
    return this.applicationsService.findByTask(taskId);
  }
}
