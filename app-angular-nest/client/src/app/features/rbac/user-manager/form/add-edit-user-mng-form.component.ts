import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import ConfirmPasswordValidator from '@shared/validation/confirm-password.validator';
import {
  ButtonColor,
  ButtonTypes,
} from '@shared/components/common/button/button.enum';
import {ViewMode} from '../../../../models';
import {User} from '../user-manager.model';
import {CommonConstant} from '../../../../constants';
import {EViewMode} from '../../../../constants/enum/view-mode.enum';
import {cloneDeep, get, isEqual} from 'lodash-es';
import {UserService} from '../user-manager.service';
import {filterObjectByKeys, getObjectKeys, isEmptyArray, isEmptyObj} from '@shared/helpers';
import {RoleService} from "../../role/role.service";

@Component({
  selector: 'add-edit-user-mng-form',
  templateUrl: './add-edit-user-mng-form.component.html',
  styleUrls: ['./add-edit-user-mng-form.component.scss'],
})
export class AddEditUserMngFormComponent {
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cdref: ChangeDetectorRef,
    private roleService: RoleService,
  ) {
  }

  protected readonly ButtonColor = ButtonColor;
  protected readonly ButtonTypes = ButtonTypes;
  protected readonly EViewMode = EViewMode;

  @Input() viewMode!: ViewMode;
  @Input() dataEdit: Partial<User> = {};
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  dataEditBk: Partial<User> = cloneDeep(this.dataEdit);
  isValid: boolean = false;

  ngOnInit() {
    this.initForm();
    if (this.isEditMode()) {
      this.form.get('username')?.disable();
      this.setDataEdit(this.dataEdit);
      this.setBkDataEdit(this.dataEdit);
    }
    this.onFormChange();
    this.getRole();
  }

  roleData: any[] = [];
  roleDataSelect: any[] = [];

  getRole() {
    this.roleService.getData().subscribe({
      next: (response) => {
        this.roleData = response.data;
      },
      error: (error) => {
        console.log('Error:', error);
      },
    });
  }

  getCurrentList(data: any) {
    console.log(data)
    if (!isEmptyArray(data.selected)) {
      this.roleDataSelect = data.selected
    }
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  isEditMode(): boolean {
    return this.viewMode === EViewMode.Edit;
  }

  onFormChange() {
    this.form.valueChanges.subscribe((val) => {
      this.checkValid(val);
    });
  }

  setBkDataEdit(dataBk: Partial<User>) {
    if (!isEmptyObj(dataBk)) {
      const formValueKeys = getObjectKeys(this.form.value);
      const filteredDataBk = filterObjectByKeys(dataBk, formValueKeys);
      this.dataEditBk = cloneDeep(filteredDataBk);
    }
  }

  initForm() {
    this.form = this.formBuilder.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [
          ConfirmPasswordValidator.match('password', 'confirmPassword'),
        ],
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  setDataEdit(data: Partial<User>) {
    this.form.patchValue({
      username: data.username,
      email: data.email,
    });
  }

  onSaveClick() {
    const userData = this.parseDataRequest();

    if (this.viewMode === EViewMode.Create) {
      console.log(userData)
      this.clearForm();
      // this.createUser(userData);
    } else if (this.viewMode === EViewMode.Edit) {
      const id = get(this.dataEdit, 'id');
      this.updateUser(id as string | number, userData);
    }
  }

  parseDataRequest() {
    const userData = this.form.value;
    userData.roles = this.roleDataSelect
    return userData
  }

  private createUser(userData: User) {
    this.userService.create(userData).subscribe({
      next: () => {
        this.clearForm();
        this.save.emit();
      },
      error: () => {
      },
    });
  }

  private updateUser(id: string | number, userData: User) {
    if (
      userData.password === CommonConstant.FAKE_PASSWORD &&
      userData.confirmPassword === CommonConstant.FAKE_PASSWORD
    ) {
      delete userData.password;
      delete userData.confirmPassword;
    }
    this.userService.update(id, userData).subscribe({
      next: () => {
        this.save.emit();
        this.onCancelClick();
      },
      error: () => {
      },
    });
  }

  clearForm() {
    this.form.reset();
    this.roleDataSelect = []
  }

  checkValid(val: Partial<User>) {
    if (this.viewMode === EViewMode.Create) {
      this.isValid = !this.form.invalid;
    } else {
      this.isValid = !this.form.invalid && !isEqual(this.dataEditBk, val);
    }
  }

  protected onCancelClick() {
    this.cancel.emit();
  }
}
