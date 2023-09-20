import { Component, ViewEncapsulation } from "@angular/core";
import { MenuService } from "@core/menu/menu.service";
import { ProjectService } from "../../../../features/todos/project/project.service";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "@shared/components/common/dialog/dialog.component";

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
        // console.log(this.menu$);
    }

    constructor(
        private menu: MenuService,
        private projectService: ProjectService,
        private dialog: MatDialog,
    ) {
    }

    addProject() {
        this.openDialog()
        // console.log("addProject");
        // const data = {
        //     title: "a"
        // };
        //
        // this.projectService.create(data).subscribe({
        //     next: (res) => {
        //         const dataResponse = res.data;
        //         this.menu$.subscribe(
        //             {
        //                 next: (res) => {
        //                     console.log(res);
        //                     res.forEach(val => {
        //                         if (val.id === "project") {
        //                             val.child?.push({
        //                                 id: 9,
        //                                 name: data.title,
        //                                 route: dataResponse.title + "-" + dataResponse.id,
        //                                 type: "link",
        //                                 icon: "task"
        //                             });
        //                         }
        //                     });
        //                 }
        //             }
        //         );
        //     }
        // });
    }

    openDialog( ) {
        const dialogRef = this.dialog.open(DialogComponent, {
            data: {
                title: "expenses.waller.createTitle",
                // template: this.dialogTemplate,
                labelApply: "common.ok",
                // isDisable: () => {
                //     return this.form.invalid;
                // },
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {

            }
        });
    }
}
