
import { SetMetadata } from '@nestjs/common';
import { CASLAction } from 'enum/action.enum';
import { MenuEnum } from 'enum/menu.enum';
import { Subjects } from 'src/casl/casl-ability.factory/casl-ability.factory';


export interface RequiredRule {
    action: CASLAction;
    subject: Subjects;
    menu_name: MenuEnum
}

export const CHECK_ABILITY = 'check_ability';
export const CheckAbilities = (...requirements: RequiredRule[]) => SetMetadata(CHECK_ABILITY, requirements);
