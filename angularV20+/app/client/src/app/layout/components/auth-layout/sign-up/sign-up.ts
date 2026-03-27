import { Component } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "@core/authentication/services/auth.service";
import { LoaderService } from "@shared/services/loader.service";
import { MatCard, MatCardContent, MatCardHeader } from "@angular/material/card";
import { TranslatePipe } from "@ngx-translate/core";
import { MatFormField } from "@angular/material/form-field";
import { MatButton } from "@angular/material/button";
import { MatInput } from "@angular/material/input";

@Component({
    selector: "app-sign-up",
    imports: [
        MatCardHeader,
        MatCardContent,
        TranslatePipe,
        ReactiveFormsModule,
        MatFormField,
        MatCard,
        MatButton,
        MatInput
    ],
    templateUrl: "./sign-up.html",
    styleUrl: "./sign-up.scss"
})
export class SignUp {
    form: FormGroup = new FormGroup({
        username: new FormControl(""),
        email: new FormControl(""),
        password: new FormControl(""),
        confirmPassword: new FormControl(""),
        // agreeTermOfService: new FormControl(false),
    });

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private loaderService: LoaderService,
        // private toast: ToastrService
    ) {
    }

    ngOnInit(): void {
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
                // agreeTermOfService: [false]
            },
            {
                validators: [
                    // ConfirmPasswordValidator.match("password", "confirmPassword"),
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
            next: (data:any) => {
                // this.toast.success(data.message);
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
