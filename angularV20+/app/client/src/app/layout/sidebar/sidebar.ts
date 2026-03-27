import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    HostListener,
    Input,
    Output,
    ViewChild
} from "@angular/core";
// import { Drawer, DrawerModule } from "primeng/drawer";
// import { Button } from "primeng/button";
// import { AvatarModule } from "primeng/avatar";
// import { Ripple } from "primeng/ripple";
// import { StyleClass } from "primeng/styleclass";
import { NgIf, NgTemplateOutlet } from "@angular/common";

@Component({
    selector: "app-sidebar",
    imports: [ NgTemplateOutlet],
    templateUrl: "./sidebar.html",
    styleUrl: "./sidebar.scss",
    standalone: true,
})
export class Sidebar implements AfterViewInit {
    // @ViewChild("drawerRef") drawerRef!: Drawer;
    @Input() collapsed = false;
    @Output() collapsedChange = new EventEmitter<boolean>();

    public isMobile = false;
    public mode: "over" | "side" = "side";
    private readonly mobileBreakpoint = 800;

    constructor(private cdr: ChangeDetectorRef) {
        this.loadSidebarState();
    }

    ngAfterViewInit() {
        this.checkScreen();
        this.cdr.detectChanges();
    }

    @HostListener("window:resize", [])
    onResize() {
        this.checkScreen();
    }

    toggle() {
        this.setCollapsed(!this.collapsed);
    }

    open() {
        this.setCollapsed(true);
    }

    close() {
        this.setCollapsed(false);
    }

    private checkScreen() {
        if (window.innerWidth <= this.mobileBreakpoint) {
            if (this.mode !== "over") {
                this.mode = "over";
                this.close();
            }
        } else {
            if (this.mode !== "side") {
                this.mode = "side";
                this.open();
                this.saveSidebarState();
            }
        }
        this.isMobile = this.mode === "over";
        this.cdr.detectChanges();
    }

    onDrawerHide() {
        this.close();
    }

    private loadSidebarState(): void {
        const saved = localStorage.getItem("sidebarState");
        if (saved) {
            try {
                const state = JSON.parse(saved);
                this.collapsed = !!state.collapsed;
                this.mode = state.mode === "over" ? "over" : "side";
            } catch {
            }
        }
    }

    private setCollapsed(value: boolean) {
        this.collapsed = value;
        this.collapsedChange.emit(this.collapsed);
        this.saveSidebarState();
    }

    private saveSidebarState(): void {
        const state = {
            collapsed: this.collapsed,
            mode: this.mode
        };
        localStorage.setItem("sidebarState", JSON.stringify(state));
    }


    protected readonly atob = atob;
}
