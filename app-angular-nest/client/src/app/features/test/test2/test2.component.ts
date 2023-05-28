import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.scss']
})
export class Test2Component {
  constructor(private http: HttpClient) {
  }
  ngOnInit() {

   return  this.http.get('/api/admin').subscribe({
      next: data => {
        console.log(data);
      },
      error: err => {

      }
    });
  }
}
