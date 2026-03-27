import { AfterViewInit, Component, OnInit, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { PreLoader } from "@bootstrap/pre-loader";
import { AuthService } from "@core/authentication/services/auth.service";

@Component({
    selector: "app-root",
    imports: [RouterOutlet],
    templateUrl: "./app.html",
    styleUrl: "./app.scss"
})
export class App implements OnInit, AfterViewInit {
    constructor(
        private preloader: PreLoader,
        private authService: AuthService
    ) {
    }

    title = "Angular app";
    thresholdTimeRefreshToken: number = 5 * 60 * 1000;

    ngOnInit() {
        if (this.authService.isLoggedIn()) {
            this.getTokenExpiresIn();
        }
    }

    getTokenExpiresIn() {
        this.authService.getTokenExpiresIn().subscribe((response:any) => {
            const expiresIn = response.data.expiresIn;
            this.checkToRefresh(expiresIn);
        });
    }

    checkToRefresh(tokenExpires: number) {
        const now = new Date().getTime();
        const timeoutRefresh = tokenExpires - this.thresholdTimeRefreshToken - now;
        console.log(
            "The token will be refreshed in:",
            new Date(timeoutRefresh).getMinutes() + " minutes"
        );
        clearInterval(this.intervalId);
        this.countdown(timeoutRefresh);
        setTimeout(() => {
            this.refreshToken();
        }, timeoutRefresh);
    }

    countDown: number = 0;
    intervalId: any;

    countdown(initialTime: number) {
        let time = initialTime;
        this.intervalId = setInterval(() => {
            if (time <= 0) {
                clearInterval(this.intervalId);
            } else {
                time -= 1000;
            }
            this.countDown = Math.floor(time / 1000);
        }, 1000);
    }

    refreshToken() {
        this.authService.refreshToken().subscribe((res: any) => {
            console.log("Refresh token success");
            if (res.statusCode === 200) {
                this.getTokenExpiresIn();
            }
        });
    }

    ngAfterViewInit() {
        this.preloader.hide();
    }
}
