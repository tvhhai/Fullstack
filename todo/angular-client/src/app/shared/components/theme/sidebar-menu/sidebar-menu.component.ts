import { Component, ViewEncapsulation } from "@angular/core";
import { MenuService } from "@core/menu/menu.service";
import { ProjectService } from "../../../../features/todos/project/project.service";

@Component({
    selector: "app-sidebar-menu",
    templateUrl: "./sidebar-menu.component.html",
    styleUrls: ["./sidebar-menu.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class SidebarMenuComponent {
    menu$ = this.menu.getAll();

    buildRoute = this.menu.buildRoute;

    ngOnInit() {
        console.log(this.menu$);
    }

    constructor(private menu: MenuService,
                private projectService: ProjectService) {
    }

    addProject() {
        console.log("addProject");
        const data = {
            title: "a"
        };

        this.projectService.create(data).subscribe({
            next: (res) => {
                // console.log(res);
                this.menu$.subscribe(
                    {
                        next: (res) => {
                            console.log(res);
                            res.forEach(val => {
                                if (val.id === "project") {
                                    val.child?.push({
                                        id: 9,
                                        name: data.title,
                                        route: "today",
                                        type: "link",
                                        icon: "task"
                                    });
                                }
                            });
                        }
                    }
                );
            }
        });
    }
}
