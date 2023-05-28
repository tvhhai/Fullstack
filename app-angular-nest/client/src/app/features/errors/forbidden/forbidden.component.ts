import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss']
})
export class ForbiddenComponent {
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
