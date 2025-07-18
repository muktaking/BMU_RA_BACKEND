import { SetMetadata } from '@nestjs/common';
import { RolePermitted } from './users/user.entity';

export const Role = (...role: RolePermitted[]) => SetMetadata('role', role);
