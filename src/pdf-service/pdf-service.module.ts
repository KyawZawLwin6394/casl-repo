import { Module } from '@nestjs/common';
import { PdfServiceController } from './pdf-service.controller';
import { PdfService } from './pdf-service.service';

@Module({
  controllers: [PdfServiceController],
  providers: [PdfService]
})
export class PdfServiceModule { }
