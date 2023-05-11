import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-test3',
  templateUrl: './test3.component.html',
  styleUrls: ['./test3.component.scss']
})
export class Test3Component {
  constructor(private http: HttpClient) {
  }
  ngOnInit() {

    return  this.http.get('api/user').subscribe({
      next: data => {
        console.log(data);
      },
      error: err => {

      }
    });
  }
}
