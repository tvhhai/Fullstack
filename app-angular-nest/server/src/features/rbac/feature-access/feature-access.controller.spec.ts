import { Test, TestingModule } from '@nestjs/testing';
import { FeatureAccessController } from './feature-access.controller';
import { FeatureAccessService } from './feature-access.service';

describe('FeatureAccessController', () => {
  let controller: FeatureAccessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeatureAccessController],
      providers: [FeatureAccessService],
    }).compile();

    controller = module.get<FeatureAccessController>(FeatureAccessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
