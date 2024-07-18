import { Test, TestingModule } from '@nestjs/testing';
import { PdfServiceController } from './pdf-service.controller';
import { PdfServiceService } from './pdf-service.service';

describe('PdfServiceController', () => {
  let controller: PdfServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PdfServiceController],
      providers: [PdfServiceService],
    }).compile();

    controller = module.get<PdfServiceController>(PdfServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
