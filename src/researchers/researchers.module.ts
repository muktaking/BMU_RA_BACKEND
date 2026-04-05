import { Module } from '@nestjs/common';
import { ResearchersController } from './researchers.controller';
import { ResearchersService } from './researchers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Researcher, SocialProfileResearcher } from './researcher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Researcher, SocialProfileResearcher])],
  controllers: [ResearchersController],
  providers: [ResearchersService],
  exports: [ResearchersService],
})
export class ResearchersModule {}
