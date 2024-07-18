import { AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects, PureAbility } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { CASLAction } from 'enum/action.enum';

export type Subjects = 'casl-rbace';

export type AppAbility = PureAbility<[CASLAction, Subjects]>;

interface Permission {
    isRead: boolean
    isWrite: boolean
    isEdit: boolean
    isDelete: boolean
    isExport: boolean
    isImport: boolean

}

@Injectable()
export class CaslAbilityFactory {
    canManage(permission: Permission): boolean {
        const { isRead, isWrite, isEdit, isDelete, isExport, isImport } = permission;
        return isRead && isWrite && isEdit && isDelete && isExport && isImport; // return true if all of them are true
    }

    createPermission(permission: Permission) {
        const { can, cannot, build } = new AbilityBuilder<PureAbility<[CASLAction, Subjects]>>(PureAbility as AbilityClass<AppAbility>);
        const { isDelete, isEdit, isRead, isWrite, isExport, isImport } = permission;
        const isManage = this.canManage(permission);
        isManage ? can(CASLAction.Manage, 'casl-rbace') : undefined;
        isRead ? can(CASLAction.Read, 'casl-rbace') : cannot(CASLAction.Read, 'casl-rbace')
        isDelete ? can(CASLAction.Delete, 'casl-rbace') : cannot(CASLAction.Delete, 'casl-rbace')
        isEdit ? can(CASLAction.Update, 'casl-rbace') : cannot(CASLAction.Update, 'casl-rbace')
        isWrite ? can(CASLAction.Create, 'casl-rbace') : cannot(CASLAction.Create, 'casl-rbace')
        isExport ? can(CASLAction.Export, 'casl-rbace') : cannot(CASLAction.Export, 'casl-rbace')
        isImport ? can(CASLAction.Import, 'casl-rbace') : cannot(CASLAction.Import, 'casl-rbace')
        return build({
            detectSubjectType: item => 'casl-rbace' as ExtractSubjectType<Subjects>,
        });
    }
}
