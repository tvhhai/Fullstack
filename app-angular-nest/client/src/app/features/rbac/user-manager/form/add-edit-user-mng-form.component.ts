import { AfterContentChecked, ChangeDetectorRef, Component, EventEmitter, Input, Output, } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators, } from "@angular/forms";
import ConfirmPasswordValidator from "@shared/validation/confirm-password.validator";
import { ButtonColor, ButtonTypes, } from "@shared/components/common/button/button.enum";
import { User } from "../user-manager.model";
import { CommonConstant } from "@shared//constants";
import { EViewMode } from "@shared//enum/view-mode.enum";
import { cloneDeep, get, isEqual } from "lodash";
import { UserService } from "../user-manager.service";
import { filterObjectByKeys, getObjectKeys, isEmptyArray, isEmptyObj } from "@shared/helpers";
import { RoleService } from "../../role/role.service";


@Component({
    selector: "add-edit-user-mng-form",
    templateUrl: "./add-edit-user-mng-form.component.html",
    styleUrls: ["./add-edit-user-mng-form.component.scss"],
})
export class AddEditUserMngFormComponent implements AfterContentChecked {
    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private roleService: RoleService,
        private cdref: ChangeDetectorRef,
    ) {
    }

    protected readonly ButtonColor = ButtonColor;
    protected readonly ButtonTypes = ButtonTypes;
    protected readonly isEmptyArray = isEmptyArray;

    @Input() viewMode!: EViewMode;
    @Output() save = new EventEmitter();
    @Output() cancel = new EventEmitter();

    form: FormGroup = new FormGroup({
        username: new FormControl(""),
        email: new FormControl(""),
        password: new FormControl(""),
        confirmPassword: new FormControl(""),
    });

    dataEditBk!: Partial<User>;
    isValid: boolean = false;
    validForm: boolean = false;
    validRole: boolean = false;
    roleData: any[] = [];
    roleDataSelect: any[] = [];
    id!: number;

    ngOnInit() {
        this.initForm();
        this.getRole();
    }

    ngAfterContentChecked() {
        this.cdref.detectChanges();
    }

    initForm() {
        this.form = this.formBuilder.group(
            {
                username: [
                    "",
                    [
                        Validators.required,
                        Validators.minLength(3),
                        Validators.maxLength(20),
                    ],
                ],
                email: ["", [Validators.required, Validators.email]],
                password: [
                    "",
                    [
                        Validators.required,
                        Validators.minLength(6),
                        Validators.maxLength(40),
                    ],
                ],
                confirmPassword: ["", Validators.required],
            },
            {
                validators: [
                    ConfirmPasswordValidator.match("password", "confirmPassword"),
                ],
            }
        );
    }

    getRole() {
        this.roleService.getData().subscribe({
            next: (response) => {
                this.roleData = response.data;
                this.callFuncInEditMode();
                this.onFormChange();
            },
            error: (error) => {
                console.log("Error:", error);
            },
        });
    }

    callFuncInEditMode() {
        if (this.isEditMode()) {
            this.form.get("username")?.disable();

            this.userService.getDataEdit().subscribe(
                {
                    next: (data) => {
                        this.id = get(data, "id", NaN);
                        this.setDataEdit(data);
                        this.setBkDataEdit(data);
                    }
                });
        }
    }

    getCurrentList(data: any) {
        if (!isEmptyArray(data.selected)) {
            this.roleDataSelect = data.selected;
            this.userService.setDataRoleEdit(this.roleDataSelect);
        }
    }

    onFormChange() {
        this.form.valueChanges.subscribe((formValue) => {
            this.checkValidForm(formValue);
        });

        this.userService.getDataRoleEdit().subscribe({
            next: (roleData) => {
                this.checkValidRole(roleData);
            }
        });
    }

    checkValidForm(formData: Partial<User>) {
        const dataEditBk = { ...this.dataEditBk };
        delete dataEditBk.roles;
        this.validForm = !this.form.invalid && !isEqual(dataEditBk, formData);
        this.checkOverallValidity();
    }

    checkValidRole(roleData: Partial<User>) {
        this.validRole = !this.form.invalid && !isEqual(this.dataEditBk.roles, roleData);
        this.checkOverallValidity();
    }

    checkOverallValidity() {
        if (this.viewMode === EViewMode.Create) {
            this.isValid = !this.form.invalid;
        } else {
            this.isValid = this.validRole || this.validForm;
        }
    }

    isEditMode(): boolean {
        return this.viewMode === EViewMode.Edit;
    }

    setDataEdit(data: Partial<User>) {
        this.form.patchValue({
            username: data.username,
            email: data.email,
        });
        this.parseRoleData(data.roles);
    }

    parseRoleData(roles: string[] | undefined) {
        this.roleDataSelect = this.roleData.filter(val => roles?.includes(val.name));
        this.userService.setDataRoleEdit(this.roleDataSelect);
    }

    setBkDataEdit(dataBk: Partial<User>) {
        if (!isEmptyObj(dataBk)) {
            const formValueKeys = getObjectKeys(this.form.value);
            const filteredDataBk = filterObjectByKeys(dataBk, formValueKeys);

            this.dataEditBk = cloneDeep(filteredDataBk);
            this.dataEditBk.roles = cloneDeep(this.roleDataSelect);
        }
    }

    get f(): { [key: string]: AbstractControl } {
        return this.form.controls;
    }

    onSaveClick() {
        const userData = this.parseDataRequest();
        if (this.viewMode === EViewMode.Create) {
            this.clearForm();
            this.createUser(userData);
        } else if (this.viewMode === EViewMode.Edit && this.id) {
            this.updateUser(this.id, userData);
        }
    }

    parseDataRequest() {
        const userData = this.form.value;
        userData.roles = this.roleDataSelect;
        return userData;
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
        this.roleDataSelect = [];
    }

    protected onCancelClick() {
        this.cancel.emit();
    }

}
