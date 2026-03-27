import { Component } from "@angular/core";
import { Header } from "../header/header";
import { Sidebar } from "../sidebar/sidebar";
import { RouterOutlet } from "@angular/router";

interface SidebarState {
    collapsed: boolean;
    mode: "over" | "side";
}

@Component({
    selector: "app-admin-layout",
    imports: [Header, Sidebar, RouterOutlet],
    templateUrl: "./admin-layout.html",
    styleUrl: "./admin-layout.scss"
})
export class AdminLayout {
    public isCollapsed!: boolean;
    public mode!: "over" | "side";

    constructor() {
        const state = this.loadSidebarState();
        this.isCollapsed = state.collapsed;
        this.mode = state.mode;
    }

    toggleSideNav() {
        this.isCollapsed = !this.isCollapsed;
        this.saveSidebarState();
    }

    private loadSidebarState(): SidebarState {
        const saved = localStorage.getItem("sidebarState");
        if (!saved) {
            const defaultState: SidebarState = { collapsed: true, mode: "side" };
            localStorage.setItem("sidebarState", JSON.stringify(defaultState));
            return defaultState;
        }

        try {
            const state = JSON.parse(saved);
            return {
                collapsed: !!state.collapsed,
                mode: state.mode === "over" ? "over" : "side",
            };
        } catch {
            const defaultState: SidebarState = { collapsed: true, mode: "side" };
            localStorage.setItem("sidebarState", JSON.stringify(defaultState));
            return defaultState;
        }
    }

    private saveSidebarState(): void {
        const state: SidebarState = {
            collapsed: this.isCollapsed,
            mode: this.mode,
        };
        localStorage.setItem("sidebarState", JSON.stringify(state));
    }
}
