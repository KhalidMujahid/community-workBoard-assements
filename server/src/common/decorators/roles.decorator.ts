import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../users/users.model';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
