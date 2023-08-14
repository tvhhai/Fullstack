import { Component } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import ConfirmPasswordValidator from '../../../../validation/confirm-password.validator';
import { AuthService } from '@core/authentication/services/auth.service';
import { LoaderService } from '@shared/services/loader.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
    form: FormGroup = new FormGroup({
        username: new FormControl(''),
        email: new FormControl(''),
        password: new FormControl(''),
        confirmPassword: new FormControl(''),
        // agreeTermOfService: new FormControl(false),
    });

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private loaderService: LoaderService,
        private toast: ToastrService
    ) {
    }

    ngOnInit(): void {
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
                // agreeTermOfService: [false]
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

    onSubmit() {
        this.loaderService.isLoading.next(true);
        if (this.form.invalid) {
            return;
        }

        const { username, email, password } = this.form.value;

        this.authService.register(username, email, password).subscribe({
            next: (data) => {
                this.toast.success(data.message);
                this.clearForm();
                this.loaderService.isLoading.next(false);
            },
            error: () => {
                this.loaderService.isLoading.next(false);
            },
        });
    }

    clearForm() {
        this.form.reset();
    }
}
