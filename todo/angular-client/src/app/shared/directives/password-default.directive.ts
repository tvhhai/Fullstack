import {
    HostListener,
    ElementRef,
    Directive,
    OnInit,
    Input,
} from '@angular/core';
import { CommonConstant } from '@shared/constants';
import { FormGroup } from '@angular/forms';

@Directive({
    selector: '[appPasswordDefaultDirective]',
})
export class PasswordDefaultDirective implements OnInit {
    @Input() appPasswordDefaultDirective = false;
    @Input() formData!: FormGroup;

    constructor(private el: ElementRef) {}

    ngOnInit() {
        this.assignFakePassword();
    }

    assignFakePassword() {
        if (this.appPasswordDefaultDirective) {
            if (this.formData) {
                this.formData.patchValue({
                    confirmPassword: CommonConstant.FAKE_PASSWORD,
                    password: CommonConstant.FAKE_PASSWORD,
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
            (key.length === 1 &&
                /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(key))
        );
    }

    isFakePassword(value: string): boolean {
        return value === CommonConstant.FAKE_PASSWORD;
    }
}
