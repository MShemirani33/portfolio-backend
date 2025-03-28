import { Test, TestingModule } from '@nestjs/testing';
import { HomePageContentController } from './home-page-content.controller';

describe('HomePageContentController', () => {
  let controller: HomePageContentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomePageContentController],
    }).compile();

    controller = module.get<HomePageContentController>(HomePageContentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
