import { Module } from '@nestjs/common';
import { UsersModule } from '@/users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [],
  providers: [],
  imports: [ConfigModule, UsersModule],
})
export class AuthenticationModule {}
