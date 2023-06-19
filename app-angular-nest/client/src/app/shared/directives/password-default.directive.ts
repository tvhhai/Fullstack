import {
  Directive,
  ElementRef,
  Host,
  HostListener,
  Input,
  Optional,
  Renderer2,
} from '@angular/core';
import {FormControl, FormGroup, NgControl, NgModel} from '@angular/forms';
import { CommonConstant } from '../../constants';

@Directive({
  selector: '[appPasswordDefaultDirective]',
})
export class PasswordDefaultDirective {
  @Input() appPasswordDefaultDirective: boolean = false;
  @Input() formData!: FormGroup;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private ngControl:NgControl,
    @Host() @Optional() private ngModel: NgModel
  ) {}

  ngOnInit() {
    this.assignFakePassword();
  }

  assignFakePassword() {
    if (this.appPasswordDefaultDirective) {
      if(this.formData) {
        this.formData.patchValue({
          password: CommonConstant.FAKE_PASSWORD,
          confirmPassword: CommonConstant.FAKE_PASSWORD,
        });
      }
    }
  }

  @HostListener('click') onClick() {
    const value = this.el.nativeElement.value;
    if (value === CommonConstant.FAKE_PASSWORD) {
      this.el.nativeElement.select();
    }
  }

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const key = event.key;
    const inputElement: HTMLInputElement = this.el.nativeElement;
    const value = this.el.nativeElement.value;

    if (this.isValidKey(key) && this.isFakePassword(value)) {
      inputElement.value = '';
    }
  }

  isValidKey(key: string): boolean {
    return (
      key === 'Backspace' ||
      key === 'Delete' ||
      key === ' ' ||
      (key.length === 1 && /[0-9a-zA-Z]/.test(key)) ||
      (key.length === 1 && /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(key))
    );
  }

  isFakePassword(value: string): boolean {
    return value === CommonConstant.FAKE_PASSWORD;
  }
}
