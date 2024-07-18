import { SetMetadata } from "@nestjs/common";
import { CHECK_ABILITY, RequiredRule } from "./check-abilities.decorator";

export const CheckClassAbilities = (...requirements: RequiredRule[]) => SetMetadata(CHECK_ABILITY, requirements);