import { Component } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../../../core/authentication/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.scss']
})
export class Test1Component {
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
  }
  ngOnInit() {
    // this.authService.test().subscribe({
    //   next: data => {
    //     console.log(data);
        // this.router.navigate(['/dashboard']);
        // this.isSuccessful = true;
        // this.isSignUpFailed = false;
      // },
      // error: err => {
        // this.errorMessage = err.error.message;
        // this.isSignUpFailed = true;
  //     }
  //   });
  }
}
