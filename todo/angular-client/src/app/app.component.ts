import { AuthService } from '@core/authentication/services/auth.service';
import { PreloaderService } from '@core/bootstrap/preloader.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    styleUrls: ['./app.component.scss'],
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, AfterViewInit {
    constructor(
        private preloader: PreloaderService,
        private authService: AuthService
    ) {}

    title = 'Angular app';
    thresholdTimeRefreshToken: number = 5 * 60 * 1000;

    ngOnInit() {
        if (this.authService.isLoggedIn()) {
            this.getTokenExpiresIn();
        }
    }

    getTokenExpiresIn() {
        this.authService.getTokenExpiresIn().subscribe(response => {
            const expiresIn = response.data.expiresIn;
            this.checkToRefresh(expiresIn);
        });
    }

    checkToRefresh(tokenExpires: number) {
        const now = new Date().getTime();
        const timeoutRefresh =
            tokenExpires - this.thresholdTimeRefreshToken - now;

        console.log(
            'The token will be refreshed in:',
            new Date(timeoutRefresh).getMinutes() + ' minutes'
        );
        setTimeout(() => {
            this.refreshToken();
        }, timeoutRefresh);
    }

    refreshToken() {
        this.authService.refreshToken().subscribe(res => {
            console.log('Refresh token success');
            if (res.statusCode === 200) {
                this.getTokenExpiresIn();
            }
        });
    }

    ngAfterViewInit() {
        this.preloader.hide();
    }
}
