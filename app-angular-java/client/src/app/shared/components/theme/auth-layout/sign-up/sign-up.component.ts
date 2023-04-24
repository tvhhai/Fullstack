import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import ConfirmPasswordValidator from "../../../../validation/confirm-password.validator";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    agreeTermOfService: new FormControl(false),
  });
  submitted = false;

  constructor(private formBuilder: FormBuilder) {
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
          email: ['', [Validators.required, Validators.email]],
          password: [
            '',
            [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(40)
            ]
          ],
          confirmPassword: ['', Validators.required],
          agreeTermOfService: [false]
        },
        {
          validators: [ConfirmPasswordValidator.match('password', 'confirmPassword')],
        }
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
  }
}