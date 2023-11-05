import { AfterViewInit, ElementRef, Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-forbidden',
  styleUrls: ['./forbidden.component.scss'],
  templateUrl: './forbidden.component.html',
})
export class ForbiddenComponent implements AfterViewInit {
  @ViewChild('myDiv') myDiv: ElementRef | any;

  ngAfterViewInit() {
    const str = this.myDiv.nativeElement.innerHTML.toString();
    let i = 0;
    this.myDiv.nativeElement.innerHTML = '';

    setTimeout(() => {
      const se = setInterval(() => {
        i++;
        this.myDiv.nativeElement.innerHTML = str.slice(0, i) + '|';
        if (i == str.length) {
          clearInterval(se);
          this.myDiv.nativeElement.innerHTML = str;
        }
      }, 10);
    }, 0);
  }
}
