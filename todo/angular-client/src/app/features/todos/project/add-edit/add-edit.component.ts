import { Component, TemplateRef, ViewChild } from "@angular/core";
import { DialogComponent } from "@shared/components/common/dialog/dialog.component";
import { FormControl, FormGroup, Validators } from "@angular/forms";


import { MatDialog } from "@angular/material/dialog";
import { ViewState } from "../../todos.enum";
import { ProjectService } from "../project.service";
import { MenuService } from "@core/menu/menu.service";
import { TodoConstant } from "../../todos.constant";
import { IColorPrj } from "../../todos.model";

@Component({
    selector: "add-edit-project",
    templateUrl: "./add-edit.component.html",
    styleUrls: ["./add-edit.component.scss"]
})
export class AddEditComponent {
    constructor(
        private projectService: ProjectService,
        private dialog: MatDialog,
        private menu: MenuService,
    ) {
    }

    @ViewChild("dialogTemplate") dialogTemplate!: TemplateRef<any>;
    menu$ = this.menu.getAll();
    colors: IColorPrj[] = TodoConstant.COLOR_PROJECT;
    views: any = [
        { name: "List", value: ViewState.List, },
        { name: "Board", value: ViewState.Board, },
    ];
    color: any = {};
    form: FormGroup = new FormGroup({
        title: new FormControl("", Validators.required,),
        color: new FormControl("#808080",),
        view: new FormControl(ViewState.List),
    });

    onItemsPerPageChange(e: any): void {
        console.log(e);
    }

    ngOnInit() {
        // console.log(this.menu$);
    }

    addProject() {
        this.openDialog();
    }

    openDialog() {
        const dialogRef = this.dialog.open(DialogComponent, {
            data: {
                title: "todo.project.add",
                template: this.dialogTemplate,
                labelApply: "common.ok",
                isDisable: () => {
                    return this.form.invalid;
                },
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                const data = this.form.value;
                this.projectService.create(data).subscribe({
                    next: (res) => {
                        const dataResponse = res.data;
                        this.menu$.subscribe(
                            {
                                next: (res) => {
                                    res.forEach(val => {
                                        if (val.id === "project") {
                                            val.child?.push({
                                                id: dataResponse.title + "-" + dataResponse.id,
                                                name: data.title,
                                                route: dataResponse.title + "-" + dataResponse.id,
                                                type: "link",
                                                icon: "",
                                                color: data.color
                                            });
                                        }
                                    });
                                }
                            }
                        );
                    }
                });
            }
        });
    }
}
