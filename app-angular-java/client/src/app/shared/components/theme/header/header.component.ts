import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() clicked = new EventEmitter<number>();
  @Input() opened!: boolean;
  toggle() {
    this.clicked.emit();
  }
}
