import { Controller, Get, Res } from '@nestjs/common';
import { PdfService } from './pdf-service.service';
import { Response } from 'express';
import * as fs from 'fs'

@Controller('pdf-service')
export class PdfServiceController {
  private userData = [
    {
      "name": "kyaw zaw lwin",
      "position": "Developer"
    },
    {
      "name": "kyaw zaw lwin",
      "position": "Developer"
    },
    {}
  ]

  constructor(
    private pdfService: PdfService,
  ) { }

  @Get('pdf')
  async generatePdf(@Res() res: Response) {
    console.log('getting called');
    await this.pdfService.addText(`Heading`);
    await this.pdfService.addNewLine(); // Leave an empty Line
    await this.pdfService.addText(`SubHeading`);
    await this.pdfService.addNewLine();
    // one page left empty for TOC
    await this.pdfService.addNewPage();

    await this.pdfService.addNewPage();
    await this.pdfService.addGenericTable(this.userData, {
      ignoreFields: ['password', 'otp', 'otpCreatedAt', 'lastPasswordUpdateAt'],
      tableName: 'Users Table',
      addToIndex: true, // add to TOC
      theme: 'grid',
    });

    // changed ignoreFields. Table resizes automatically. Look in pdf images
    await this.pdfService.addGenericTable(this.userData, {
      ignoreFields: ['password', 'otp', 'otpCreatedAt', 'lastPasswordUpdateAt', 'createdAt'],
      tableName: 'Users2 Table',
      addToIndex: true, // add to TOC
      theme: 'striped',
    });

    await this.pdfService.addNewPage();
    await this.pdfService.addText(`TRAILING PAGE`, {
      align: 'center',
    });
    // this.pdfService.addImage(chart, { width: 200, height: 200 })
    const pdfDoc = await this.pdfService.render();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');
    res.sendFile(pdfDoc, { root: process.cwd() }, (err) => {
      if (err) {
        console.error(err);
      }
      fs.unlinkSync(pdfDoc); // Remove the temporary PDF file
    });
  }
}
