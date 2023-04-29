import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {filter} from 'rxjs/operators';
import {AuthService} from "../../../../../core/authentication/services/auth.service";

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {

    form: FormGroup = new FormGroup({
        username: new FormControl(''),
        password: new FormControl(''),
        rememberMe: new FormControl(false),
    });
    submitted = false;

    constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group(
            {

                username: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(3),
                        Validators.maxLength(20)
                    ]
                ],
                password: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(6),
                        Validators.maxLength(40)
                    ]
                ],
                rememberMe: [false]
            },
        );
    }

    get f(): { [key: string]: AbstractControl } {
        return this.form.controls;
    }

    onSubmit() {
        if (this.form.invalid) {
            return;
        }
        console.log(this.form.value)
        console.log(JSON.stringify(this.form.value, null, 2));
        const { username, password } = this.form.value;
        this.authService.login(username, password).subscribe({
            next: data => {
                console.log(data);
                // this.isSuccessful = true;
                // this.isSignUpFailed = false;
            },
            error: err => {
                // this.errorMessage = err.error.message;
                // this.isSignUpFailed = true;
            }
        });
    }

}
