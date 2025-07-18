import { Module } from '@nestjs/common';
import { ScalesController } from './scales.controller';
import { ScalesService } from './scales.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scale } from './scale.entity';
import { Researcher } from 'src/researchers/researcher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Scale, Researcher])],
  controllers: [ScalesController],
  providers: [ScalesService],
})
export class ScalesModule {}
