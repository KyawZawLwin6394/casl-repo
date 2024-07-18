import {
    CanActivate,
    ExecutionContext,
    Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CHECK_ABILITY, RequiredRule } from 'decorator/check-abilities.decorator';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';

@Injectable()
export class AbilitiesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private caslAbilityFactory: CaslAbilityFactory,
    ) { }

    canActivate(context: ExecutionContext): boolean {
        const handlerRules = this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) || [];
        const classRules = this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getClass()) || [];
        // to bypass common apis
        if (handlerRules.length === 0 || classRules.length === 0) {
            return true
        }
        const ability = this.caslAbilityFactory.createPermission({
            isDelete: true,
            isEdit: false,
            isRead: true,
            isWrite: true,
            isImport: true,
            isExport: true
        });
        // we want to priotize classRule here if it's incorrect we'll pass it to the handlerRules 
        // if both them them are wrong then it's denined
        const classRuleResult = classRules.every(rule => ability.can(rule.action, rule.subject))
        if (classRuleResult) {
            return classRuleResult
        } else {
            return handlerRules.every(rule => ability.can(rule.action, rule.subject));
        }
    }
}
