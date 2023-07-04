import { EPermission } from "../../enum/permission.enum";

export class CreatePermissionDto {
    name: string;
    description: string;
    permission:  Record<EPermission, boolean>;
}
