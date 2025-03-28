import { Test, TestingModule } from '@nestjs/testing';
import { HomePageContentService } from './home-page-content.service';

describe('HomePageContentService', () => {
  let service: HomePageContentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HomePageContentService],
    }).compile();

    service = module.get<HomePageContentService>(HomePageContentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
