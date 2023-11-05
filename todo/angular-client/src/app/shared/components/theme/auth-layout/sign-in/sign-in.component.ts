import {
    AbstractControl,
    FormBuilder,
    FormControl,
    Validators,
    FormGroup,
} from '@angular/forms';
import { AuthService } from '@core/authentication/services/auth.service';
import { LoaderService } from '@shared/services/loader.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-sign-in',
    styleUrls: ['./sign-in.component.scss'],
    templateUrl: './sign-in.component.html',
})
export class SignInComponent implements OnInit {
    form: FormGroup = new FormGroup({
        password: new FormControl(''),
        username: new FormControl(''),
        // rememberMe: new FormControl(false),
    });

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private loaderService: LoaderService
    ) {}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            password: [
                'switch',
                [
                    Validators.required,
                    Validators.minLength(6),
                    Validators.maxLength(40),
                ],
            ],
            username: [
                'admin',
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(20),
                ],
            ],
            // rememberMe: [false]
        });
    }

    get f(): { [key: string]: AbstractControl } {
        return this.form.controls;
    }

    onSubmit() {
        this.loaderService.isLoading.next(true);
        if (this.form.invalid) {
            return;
        }

        const { password, username } = this.form.value;
        this.authService.login(username, password).subscribe({
            error: () => {
                this.loaderService.isLoading.next(false);
            },
            next: () => {
                this.loaderService.isLoading.next(false);
            },
        });
    }
}
