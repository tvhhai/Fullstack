import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '@core/authentication/services/auth.service';
import { LoaderService } from '@shared/services/loader.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    // rememberMe: new FormControl(false),
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40),
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

    const { username, password } = this.form.value;
    this.authService.login(username, password).subscribe({
      next: () => {
        this.loaderService.isLoading.next(false);
      },
      error: () => {
        this.loaderService.isLoading.next(false);
      },
    });
  }
}
