import {
  Component,
  EventEmitter,
  Input, OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  ButtonColor,
  ButtonTypes,
} from '@shared/components/common/button/button.enum';
import { EViewMode } from '@shared/enum/view-mode.enum';
import { cloneDeep, get, isEqual } from 'lodash';

import { RoleService } from '../role.service';
import {
  FeatureAccess,
  FeatureAccessRequest,
} from '../../access-control/access-control.model';
import { Role, RoleRequest } from '../role.model';
import { AccessControlComponent } from '../../access-control/access-control.component';
import { isEmptyObj } from '@shared/helpers';
import { AccessControlService } from '../../access-control/access-control.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'add-edit-role-form',
  templateUrl: './add-edit-role.component.html',
  styleUrls: ['./add-edit-role.component.scss'],
})
export class AddEditRoleComponent implements OnDestroy{
  constructor(
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private accessControlService: AccessControlService
  ) {}

  protected readonly ButtonColor = ButtonColor;
  protected readonly ButtonTypes = ButtonTypes;

  @ViewChild(AccessControlComponent) child!: AccessControlComponent;

  @Input() viewMode!: EViewMode;
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
  });

  dataEditBk!: RoleRequest;
  permissions: FeatureAccess[] = [];
  isValid: boolean = false;
  roleRequestSubscription!: Subscription;
  id!:number;
  ngOnInit() {
    this.initForm();
    if (this.isEditMode()) {
      this.roleRequestSubscription = this.roleService.getDataEdit().subscribe({
        next: (roleRequest) => {
          this.id = get(roleRequest, 'id', NaN)
          this.setFormData(roleRequest);
          this.setBkDataEdit(roleRequest);
        },
      });
    }
    this.onFormChange();
  }

  ngOnDestroy() {
    this.roleRequestSubscription?.unsubscribe();
  }

  setFormData(data: Partial<Role>) {
    this.form.patchValue({
      name: data.name,
      description: data.description,
    });
  }

  setBkDataEdit(dataBk: RoleRequest) {
    if (!isEmptyObj(dataBk)) {
      this.dataEditBk = cloneDeep(dataBk);
      delete this.dataEditBk.id
    }
  }

  isEditMode(): boolean {
    return this.viewMode === EViewMode.Edit;
  }

  onFormChange() {
    this.form.valueChanges.subscribe((form) => {
      this.accessControlService.getDataAccessControl().subscribe({
        next: (permissions) => {
          this.permissions = permissions;
          form.permissions = this.removeAttr(cloneDeep(permissions));
          this.checkValid(form);
        },
      });
    });
  }

  checkValid(dataEdit: Partial<Role>) {
    if (this.viewMode === EViewMode.Create) {
      this.isValid = !this.form.invalid;
    } else {
      this.isValid = !this.form.invalid && !isEqual(this.dataEditBk, dataEdit);
    }
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: [''],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onCancelClick() {
    this.cancel.emit()
  }

  onSaveClick() {
    const roleData = this.getRoleData();
    if (this.viewMode === EViewMode.Create) {
      this.createRole(roleData);
      this.clearData();
    } else if (this.viewMode === EViewMode.Edit) {
      this.updateRole(this.id , roleData);
    }
  }

  getRoleData() {
    return this.form.value;
  }

  clearData() {
    this.form.reset();
    this.clearAppAccessControl();
  }

  clearAppAccessControl() {
    this.child.clearAppAccessControl();
  }

  createRole(roleData: Role) {
    this.roleService.create(roleData).subscribe({
      next: () => {
        this.clearData();
        this.save.emit();
      },
      error: () => {},
    });
  }

  updateRole(id: number, roleData: Role) {
    this.roleService.update(id, roleData).subscribe({
      next: () => {
        this.save.emit();
        this.onCancelClick();
      },
      error: () => {},
    });
  }

  removeAttr(data: FeatureAccessRequest[]) {
    data.forEach((permission: FeatureAccessRequest) => {
      delete permission.accessListMapping;
      delete permission.created_at;
      delete permission.updated_at;
      delete permission.id;
      delete permission.checkbox;
    });
    return data;
  }
}
