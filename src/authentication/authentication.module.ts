import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
  imports: [UsersModule],
})
export class AuthenticationModule {}
