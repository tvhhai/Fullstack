import {
    SimpleChanges,
    ElementRef,
    Directive,
    OnChanges,
    Renderer2,
    OnInit,
    Input,
} from '@angular/core';
import * as zxcvbn from 'zxcvbn';

@Directive({
    selector: '[appPasswordMeter]',
})
export class PasswordMeterDirective implements OnChanges, OnInit {
    @Input() appPasswordMeter = '';
    private strengthScore = '';
    private readonly passwordStrengthClass: string = 'password-strength-meter';
    private readonly numberMeterBar: number = 5;
    private readonly passwordMeterClass: string = 'meter-bar';
    private readonly passwordMeterOverlayClass: string = 'meter-bar-overlay';
    private readonly attributeStrengthHtml: string = 'data-strength';

    constructor(
        private el: ElementRef,
        private renderer: Renderer2
    ) {}

    ngOnInit() {
        this.renderStrengthMeter();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['appPasswordMeter']) {
            if (changes['appPasswordMeter'].currentValue === '') {
                this.updateStrengthAttribute('');
            } else {
                const newScore = zxcvbn(
                    changes['appPasswordMeter'].currentValue
                ).score;
                this.strengthScore = String(newScore);
                this.updateStrengthAttribute(this.strengthScore);
            }
        }
    }

    private renderStrengthMeter() {
        const divElement = document.createElement('div');
        const targetElement = this.el.nativeElement.querySelector(
            '.mat-mdc-form-field-subscript-wrapper'
        );
        divElement.className = this.passwordStrengthClass;
        divElement.setAttribute(this.attributeStrengthHtml, this.strengthScore);

        const meterBarElements = Array.from(
            { length: this.numberMeterBar },
            () => {
                const meterBar = document.createElement('span');
                meterBar.className = this.passwordMeterClass;
                return meterBar;
            }
        );

        meterBarElements.forEach(bar => divElement.appendChild(bar));

        const divOverlay = document.createElement('div');
        divOverlay.className = this.passwordMeterOverlayClass;
        divElement.appendChild(divOverlay);

        this.renderer.insertBefore(
            this.el.nativeElement,
            divElement,
            targetElement
        );
    }

    private updateStrengthAttribute(strength: string) {
        const strengthDiv = this.el.nativeElement.querySelector(
            '.' + this.passwordStrengthClass
        );
        if (strengthDiv) {
            this.renderer.setAttribute(
                strengthDiv,
                this.attributeStrengthHtml,
                strength
            );
        }
    }
}
