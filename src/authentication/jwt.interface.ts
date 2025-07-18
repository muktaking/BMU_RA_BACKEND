import { RolePermitted } from 'src/users/user.entity';

export interface jwtPayload {
  email: string;
  id: number;
  role: RolePermitted;
}
