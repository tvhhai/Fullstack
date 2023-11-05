import {
  ViewEncapsulation,
  EventEmitter,
  Component,
  Optional,
  Inject,
  Output,
  OnInit, Input,
} from "@angular/core";
import { FormControl } from '@angular/forms';
import { DOCUMENT } from '@angular/common';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit{
  @Output() clicked = new EventEmitter<number>();
  @Input() opened!: boolean;

  toggleControl = new FormControl(false);

  private htmlElement!: HTMLHtmlElement;

  constructor(@Optional() @Inject(DOCUMENT) private document: Document) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.htmlElement = this.document.querySelector('html')!;
  }

  ngOnInit(): void {
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      if (darkMode) {
        this.htmlElement.classList.add('theme-dark');
      } else {
        this.htmlElement.classList.remove('theme-dark');
      }
    });
  }

  toggle() {
    this.clicked.emit();
  }
}
