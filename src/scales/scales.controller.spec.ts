import { Test, TestingModule } from '@nestjs/testing';
import { ScalesController } from './scales.controller';

describe('ScalesController', () => {
  let controller: ScalesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScalesController],
    }).compile();

    controller = module.get<ScalesController>(ScalesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
