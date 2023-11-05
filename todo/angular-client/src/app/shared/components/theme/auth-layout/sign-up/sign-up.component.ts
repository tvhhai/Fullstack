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
import { ToastrService } from 'ngx-toastr';

import ConfirmPasswordValidator from '../../../../validation/confirm-password.validator';

@Component({
  selector: 'app-sign-up',
  styleUrls: ['./sign-up.component.scss'],
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent implements OnInit {
  form: FormGroup = new FormGroup({
    confirmPassword: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    username: new FormControl(''),
    // agreeTermOfService: new FormControl(false),
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private loaderService: LoaderService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        confirmPassword: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ],
        ],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
          ],
        ],
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

    const { email, password, username } = this.form.value;

    this.authService.register(username, email, password).subscribe({
      error: () => {
        this.loaderService.isLoading.next(false);
      },
      next: data => {
        this.toast.success(data.message);
        this.clearForm();
        this.loaderService.isLoading.next(false);
      },
    });
  }

  clearForm() {
    this.form.reset();
  }
}
