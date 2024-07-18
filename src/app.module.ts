import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CaslModule } from './casl/casl.module';
import { APP_GUARD } from '@nestjs/core';
import { AbilitiesGuard } from 'guard/abilities.guard';
import { PdfServiceModule } from './pdf-service/pdf-service.module';

@Module({
  imports: [CaslModule, PdfServiceModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: AbilitiesGuard
    }
  ],
})
export class AppModule { }
