import { Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { CheckAbilities } from 'decorator/check-abilities.decorator';
import { CASLAction } from 'enum/action.enum';
import { MenuEnum } from 'enum/menu.enum';
import { CheckClassAbilities } from 'decorator/class-aiblities.decorator';

@Controller()
@CheckClassAbilities({ action: CASLAction.Manage, subject: 'casl-rbace', menu_name: MenuEnum.Absence_Chart })
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Delete()
  @CheckAbilities({ action: CASLAction.Delete, subject: 'casl-rbace', menu_name: MenuEnum.Absence_Chart })
  delete(): string {
    return this.appService.getHello('Delete');
  }


  @Get()
  @CheckAbilities({ action: CASLAction.Read, subject: 'casl-rbace', menu_name: MenuEnum.Absence_Chart })
  get(): string {
    return this.appService.getHello('Get');
  }


  @Post()
  @CheckAbilities({ action: CASLAction.Create, subject: 'casl-rbace', menu_name: MenuEnum.Absence_Chart })
  post(): string {
    return this.appService.getHello('Post');
  }


  @Patch()
  @CheckAbilities({ action: CASLAction.Update, subject: 'casl-rbace', menu_name: MenuEnum.Absence_Chart })
  patch(): string {
    return this.appService.getHello('Patch');
  }

  @Post('import')
  @CheckAbilities({ action: CASLAction.Import, subject: 'casl-rbace', menu_name: MenuEnum.Absence_Chart })
  import(): string {
    return this.appService.getHello('import')
  }

  @Post('export')
  @CheckAbilities({ action: CASLAction.Export, subject: 'casl-rbace', menu_name: MenuEnum.Absence_Chart })
  export(): string {
    return this.appService.getHello('export')
  }
}
