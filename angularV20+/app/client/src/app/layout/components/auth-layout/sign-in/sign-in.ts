import { Component, OnInit } from "@angular/core";

import { TranslatePipe } from "@ngx-translate/core";
import { RouterLink } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "@core/authentication/services/auth.service";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatIcon } from "@angular/material/icon";

@Component({
    selector: "app-sign-in",
    imports: [
        TranslatePipe,
        RouterLink,
        MatCardModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        MatCheckbox,
    ],
    templateUrl: "./sign-in.html",
    styleUrl: "./sign-in.scss"
})
export class SignIn implements OnInit {
    form: FormGroup = new FormGroup({
        username: new FormControl(""),
        password: new FormControl(""),
        rememberMe: new FormControl(false),
    });

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        // private loaderService: LoaderService
    ) {
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            username: [
                "",
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(20),
                ],
            ],
            password: [
                "",
                [
                    Validators.required,
                    Validators.minLength(6),
                    Validators.maxLength(40),
                ],
            ],
            rememberMe: [false]
        });
    }

    get f(): { [key: string]: AbstractControl } {
        return this.form.controls;
    }

    onSubmit() {
        // this.loaderService.isLoading.next(true);
        if (this.form.invalid) {
            return;
        }

        const { username, password } = this.form.value;
        this.authService.login(username, password).subscribe({
            next: () => {
                // this.loaderService.isLoading.next(false);
            },
            error: () => {
                // this.loaderService.isLoading.next(false);
            },
        });
    }
}
