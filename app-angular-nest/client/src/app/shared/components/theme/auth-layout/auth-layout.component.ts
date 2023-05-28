import {Component, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'app-auth-layout',
    template: `
        <div class="auth-container">
            <app-loader></app-loader>
            <router-outlet></router-outlet>
        </div>
    `,
    styles: [`
      .auth-container {
        position: relative;
        display: flex;
        justify-content: center;
        min-height: 100%;
        padding: 16px;
        background-color: #212121;
        background-image: linear-gradient(
                        45deg,
                        rgba(255, 255, 255, 0.05) 25%,
                        transparent 25%,
                        transparent 75%,
                        rgba(255, 255, 255, 0.05) 75%,
                        rgba(255, 255, 255, 0.05)
        ),
        linear-gradient(
                        -45deg,
                        rgba(255, 255, 255, 0.05) 25%,
                        transparent 25%,
                        transparent 75%,
                        rgba(255, 255, 255, 0.05) 75%,
                        rgba(255, 255, 255, 0.05)
        );
        background-size: 60px 60px;
        }
    `],
    encapsulation: ViewEncapsulation.None,
})
export class AuthLayoutComponent {

}
