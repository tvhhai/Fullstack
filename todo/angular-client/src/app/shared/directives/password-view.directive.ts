import { ElementRef, Directive, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appPasswordView]',
})
export class PasswordViewDirective implements OnInit {
  private isPasswordVisible = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.renderPasswordVisibilityToggle();
  }

  private renderPasswordVisibilityToggle() {
    const parentContainer = this.getParentContainer();

    if (parentContainer) {
      const toggleContainer = this.createToggleContainer();
      const toggleIcon = this.createToggleIcon();

      this.renderer.listen(toggleIcon, 'click', () => {
        this.togglePasswordVisibility(toggleIcon);
      });

      this.renderer.appendChild(toggleContainer, toggleIcon);
      this.renderer.appendChild(parentContainer, toggleContainer);
    }
  }

  private getParentContainer(): HTMLElement | null {
    const parentFormGroup = this.el.nativeElement.parentElement;
    return parentFormGroup ? parentFormGroup.parentElement : null;
  }

  private createToggleContainer(): HTMLDivElement {
    const toggleContainer = document.createElement('div');
    toggleContainer.className = 'mat-mdc-form-field-icon-suffix';
    return toggleContainer;
  }

  private createToggleIcon(): HTMLElement {
    //     const toggleIcon = document.createElement("mat-icon");
    //     toggleIcon.setAttribute("matSuffix", "");
    //     toggleIcon.setAttribute("role", "button");
    //     toggleIcon.innerHTML = "visibility_off";
    //     toggleIcon.className = "mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color";
    //     return toggleIcon;

    // change to use the icon class
    const toggleIcon = document.createElement('i');
    toggleIcon.setAttribute('role', 'button');
    toggleIcon.className = 'fa-regular fa-eye-slash fa-lg';
    return toggleIcon;
  }

  togglePasswordVisibility(toggleIcon: HTMLElement) {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.el.nativeElement.type = this.isPasswordVisible ? 'text' : 'password';
    // toggleIcon.innerHTML = this.isPasswordVisible ? "visibility" : "visibility_off";
    toggleIcon.className = this.isPasswordVisible
      ? 'fa-regular fa-eye fa-lg'
      : 'fa-regular fa-eye-slash fa-lg';
  }
}
