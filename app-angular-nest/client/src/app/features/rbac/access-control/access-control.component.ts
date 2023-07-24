import { Component, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RoleService } from '../role/role.service';

import { isEmptyArray, isEmptyObj } from '@shared/helpers';
import { get, cloneDeep, includes, isEqual } from 'lodash';
import {
  FeatureAccess,
  EPermission,
  AccessMapping,
  SubHeaders,
  ControlHeaders,
  MapAccessControl,
} from './access-control.model';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { RoleRequest } from '../role/role.model';
import { AccessControlService } from './access-control.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-access-control',
  templateUrl: './access-control.component.html',
  styleUrls: ['./access-control.component.scss'],
})
export class AccessControlComponent implements OnDestroy {
  constructor(
    private roleService: RoleService,
    private translateService: TranslateService,
    private accessControlService: AccessControlService
  ) {}

  dataAccessControl!: RoleRequest;

  permissions: FeatureAccess[] = [];

  accessControlDataUnChecked: MapAccessControl = {
    [EPermission.READ]: {
      value: false,
      name: EPermission.VIEW,
      titleI18n: 'role.permission.view',
    },
    [EPermission.ADD]: {
      value: false,
      name: EPermission.ADD,
      titleI18n: 'role.permission.add',
    },
    [EPermission.EDIT]: {
      value: false,
      name: EPermission.EDIT,
      titleI18n: 'role.permission.edit',
    },
    [EPermission.DELETE]: {
      value: false,
      name: EPermission.DELETE,
      titleI18n: 'role.permission.delete',
    },
  };

  permsConvert = {
    read: EPermission.VIEW,
    write: [EPermission.ADD, EPermission.EDIT, EPermission.DELETE],
  };

  accessControlHeader: ControlHeaders[] = [
    {
      headerName: this.translateService.instant('role.columns.app'),
      rowspan: 2,
    },
    {
      headerName: this.translateService.instant('role.permission.read'),
    },
    {
      headerName: this.translateService.instant('role.permission.write'),
      colspan: 3,
      class: 'width-cell-fit',
      checkbox: {
        value: false,
        name: EPermission.WRITE,
      },
    },
  ];

  headerWriteIndex = 2;

  subHeaders: SubHeaders[] = [
    {
      headerName: this.translateService.instant('role.permission.view'),
      class: 'width-cell-fit',
      checkbox: {
        value: false,
        name: EPermission.VIEW,
      },
    },
    {
      headerName: this.translateService.instant('role.permission.add'),
      class: 'width-cell-fit',
      checkbox: {
        name: EPermission.ADD,
        value: false,
      },
    },
    {
      headerName: this.translateService.instant('role.permission.edit'),
      class: 'width-cell-fit',
      checkbox: {
        name: EPermission.EDIT,
        value: false,
      },
    },
    {
      headerName: this.translateService.instant('role.permission.delete'),
      class: 'width-cell-fit',
      checkbox: {
        name: EPermission.DELETE,
        value: false,
      },
    },
  ];

  roleRequestSubscription!: Subscription;
  accessControlSubscription!: Subscription;

  ngOnInit() {
    this.roleRequestSubscription = this.roleService.getDataEdit().subscribe({
      next: (roleRequest) => {
        this.dataAccessControl = roleRequest;
      },
    });

    this.roleService.getPermission().subscribe({
      next: (response) => {
        this.permissions = get(response, 'data', []) as FeatureAccess[];
        if (!isEmptyObj(this.dataAccessControl.permissions)) {
          const permissions = this.dataAccessControl.permissions?.map(
            (val) => ({
              ...val,
              accessList: val.accessList,
            })
          );

          this.permissions = cloneDeep(permissions);
        }
        this.parseDataResponse(this.permissions);
      },
      error: (error) => {
        console.log('Error:', error);
      },
    });
  }

  onAccessControlChange() {
    this.accessControlSubscription = this.accessControlService
      .getDataAccessControl()
      .subscribe({
        next: () => {
          this.detectAutoChecked();
        },
      });
  }

  ngOnDestroy() {
    this.roleRequestSubscription?.unsubscribe();
    this.accessControlSubscription?.unsubscribe();
    this.accessControlService.setDataAccessControl([]);
  }

  parseAccessListMapping(accessList: EPermission[]): AccessMapping[] {
    const access = cloneDeep(this.accessControlDataUnChecked);

    if (includes(accessList, EPermission.WRITE)) {
      access[EPermission.ADD].value =
        access[EPermission.EDIT].value =
        access[EPermission.DELETE].value =
          true;
    }

    accessList.forEach((val) => {
      if (val !== EPermission.WRITE) {
        access[val].value = true;
      }
    });

    return Object.values(cloneDeep(access));
  }

  parseDataResponse(data: FeatureAccess[]) {
    const result = Object.values(this.accessControlDataUnChecked);

    data.forEach((val) => {
      val.accessListMapping = isEmptyArray(val.accessList)
        ? cloneDeep(result)
        : this.parseAccessListMapping(val.accessList);
      val.checkbox = {
        value: val.accessListMapping.every((k) => k.value),
        name: 'all',
      };
    });

    this.accessControlService.setDataAccessControl(data);
    this.onAccessControlChange();
  }

  parseDataRequest(data: FeatureAccess[]) {
    data.forEach((permission: FeatureAccess) => {
      const accessList = this.getFilteredAccessList(
        permission.accessListMapping
      );
      this.replaceViewWithRead(accessList);
      this.replaceAddEditDeleteWithWrite(accessList);

      permission.accessList = accessList;
    });

    this.accessControlService.setDataAccessControl(data);
  }

  getFilteredAccessList(accessListMapping: AccessMapping[]): EPermission[] {
    return accessListMapping
      .filter((mapping: AccessMapping) => mapping.value)
      .map((mapping: AccessMapping) => mapping.name) as EPermission[];
  }

  replaceViewWithRead(accessList: string[]) {
    const viewIndex = accessList.indexOf(EPermission.VIEW);
    if (viewIndex !== -1) {
      accessList[viewIndex] = EPermission.READ;
    }
  }

  replaceAddEditDeleteWithWrite(accessList: string[]) {
    const hasAdd = accessList.includes(EPermission.ADD);
    const hasEdit = accessList.includes(EPermission.EDIT);
    const hasDelete = accessList.includes(EPermission.DELETE);

    if (hasAdd && hasEdit && hasDelete) {
      const addIndex = accessList.indexOf(EPermission.ADD);
      accessList.splice(addIndex, 3, EPermission.WRITE);
    }
  }

  selectCbWritePerms(event: MatCheckboxChange) {
    this.subHeaders.forEach((val) => {
      if (includes(this.permsConvert.write, val.checkbox.name)) {
        val.checkbox.value = event.checked;
      }
    });

    this.permissions.forEach((val: FeatureAccess) => {
      this.permsConvert.write.forEach((k: any) => {
        this.onCheckboxChange(val, k, event);
      });
    });
  }

  selectAllCbWritePerms(item: AccessMapping, event: MatCheckboxChange) {
    this.permissions.forEach((val: FeatureAccess) => {
      this.onCheckboxChange(val, item, event);
    });
  }

  selectAllCbPermsForApp(permission: FeatureAccess) {
    permission.checkbox.value = permission.accessListMapping.every(
      (val) => val.value
    );
  }

  selectAllCbApp(item: FeatureAccess, event: MatCheckboxChange) {
    item.accessListMapping.forEach((val: AccessMapping) => {
      val.value = event.checked;
      this.onCheckboxChange(item, val, event);
    });
  }

  onCheckboxChange(item: FeatureAccess, access: AccessMapping, event: any) {
    const checked = event.checked;

    const name = access.name ?? access;

    const matchingAccess = item.accessListMapping.find(
      (val) => val.name === name
    );

    if (matchingAccess) {
      matchingAccess.value = checked;
    }

    this.accessControlService.setDataAccessControl(this.permissions);

    this.parseDataRequest(this.permissions);
  }

  detectAutoChecked() {
    const checkboxMap = this.buildCheckboxMap();

    const selectedPermissions = this.updateCheckboxValues(checkboxMap);

    this.updateWriteCheckbox(selectedPermissions);
  }

  buildCheckboxMap() {
    const checkboxMap: Record<string, AccessMapping[]> = {
      [EPermission.VIEW]: [],
      [EPermission.ADD]: [],
      [EPermission.EDIT]: [],
      [EPermission.DELETE]: [],
    };

    this.permissions.forEach((permission) => {
      this.selectAllCbPermsForApp(permission);
      permission.accessListMapping.forEach((mapping) => {
        const { name, value } = mapping;
        if (checkboxMap.hasOwnProperty(name) && value) {
          checkboxMap[name].push(mapping);
        }
      });
    });

    return checkboxMap;
  }

  updateCheckboxValues(
    checkboxMap: Record<string, AccessMapping[]>
  ): EPermission[] {
    const selectedPermissions: EPermission[] = [];

    const permissionsLength = this.permissions.length;
    const isAllPermissionsChecked = (name: EPermission) =>
      checkboxMap[name]?.length === permissionsLength &&
      permissionsLength !== 0;

    this.subHeaders.forEach((subHeader) => {
      const { checkbox } = subHeader;
      const { name } = checkbox;

      checkbox.value =
        (name === EPermission.VIEW &&
          isAllPermissionsChecked(EPermission.VIEW)) ||
        (name === EPermission.ADD &&
          isAllPermissionsChecked(EPermission.ADD)) ||
        (name === EPermission.EDIT &&
          isAllPermissionsChecked(EPermission.EDIT)) ||
        (name === EPermission.DELETE &&
          isAllPermissionsChecked(EPermission.DELETE));

      if (name !== EPermission.VIEW && checkbox.value) {
        selectedPermissions.push(name as EPermission);
      }
    });

    return selectedPermissions;
  }

  updateWriteCheckbox(selectedPermissions: EPermission[]) {
    const writeCheckbox =
      this.accessControlHeader[this.headerWriteIndex].checkbox;

    if (writeCheckbox) {
      writeCheckbox.value = isEqual(
        selectedPermissions,
        this.permsConvert.write
      );
    }
  }

  clearAppAccessControl() {
    const dataUnChecked = Object.values(this.accessControlDataUnChecked);

    this.permissions.forEach((val) => {
      val.accessListMapping = dataUnChecked;
    });

    this.accessControlService.setDataAccessControl(this.permissions);
  }
}
