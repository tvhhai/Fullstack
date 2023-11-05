import {
    TemplateRef,
    Component,
    ViewChild,
    OnInit,
    Input,
} from '@angular/core';
import { DialogComponent } from '@shared/components/common/dialog/dialog.component';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { EViewMode } from '@shared/enum/view-mode.enum';
import { MenuService } from '@core/menu/menu.service';
import { MatDialog } from '@angular/material/dialog';

import { IProjectReq } from '../model/project.model';
import { ProjectService } from '../project.service';
import { TodoConstant } from '../../todos.constant';
import { IColorPrj } from '../../todos.model';
import { ViewState } from '../../todos.enum';

@Component({
    selector: 'add-edit-project',
    styleUrls: ['./add-edit.component.scss'],
    templateUrl: './add-edit.component.html',
})
export class AddEditProjectComponent implements OnInit {
    constructor(
        private projectService: ProjectService,
        private dialog: MatDialog,
        private menu: MenuService
    ) {}

    @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
    @Input() viewMode: EViewMode = EViewMode.Create;
    @Input() dataEdit: any;
    protected readonly EViewMode = EViewMode;

    menu$ = this.menu.getAll();
    colors: IColorPrj[] = TodoConstant.COLOR_PROJECT;
    views: { value: ViewState; name: string }[] = [
        { name: 'List', value: ViewState.List },
        { name: 'Board', value: ViewState.Board },
    ];

    color: any = {};
    form: FormGroup = new FormGroup({
        color: new FormControl('#808080'),
        title: new FormControl('', Validators.required),
        view: new FormControl(ViewState.List),
    });

    ngOnInit() {
        if (this.viewMode === EViewMode.Edit) {
            this.setFormData(this.dataEdit);
        }
    }

    onAddProject() {
        this.openDialog(this.viewMode);
    }

    onEditProject() {
        this.openDialog(this.viewMode);
    }

    setFormData(data: any) {
        this.form.patchValue({
            color: data.color,
            title: data.name,
            view: data.view,
        });
    }

    openDialog(viewMode: EViewMode) {
        const dialogRef = this.dialog.open(DialogComponent, {
            data: {
                isDisable: () => {
                    return this.form.invalid;
                },
                template: this.dialogTemplate,
                title:
                    viewMode === EViewMode.Create
                        ? 'todo.project.add'
                        : 'todo.project.edit',
            },
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                const data = this.form.value;

                this.viewMode === EViewMode.Create
                    ? this.handleAddProject(data)
                    : this.handleEditProject(data);
            }
        });
    }

    handleAddProject(data: IProjectReq) {
        this.projectService.create(data).subscribe({
            next: res => {
                const dataResponse = res.data;
                this.menu$.subscribe({
                    next: res => {
                        res.forEach(val => {
                            if (val.id === 'project') {
                                val.child?.push({
                                    id: dataResponse.id,
                                    childOfProject: true,
                                    color: data.color,
                                    countTask: 0,
                                    icon: '',
                                    name: data.title ?? '',
                                    route:
                                        dataResponse.titleSlug +
                                        '-' +
                                        dataResponse.id,
                                    type: 'link',
                                });
                            }
                        });
                    },
                });
            },
        });
    }

    handleEditProject(data: IProjectReq) {
        this.projectService.update(this.dataEdit.id, data).subscribe({
            next: res => {
                const dataResponse = res.data;
                this.menu$.subscribe({
                    next: res => {
                        const projectMenu = res.find(
                            val => val.id === 'project'
                        );
                        if (projectMenu) {
                            const projectItem = projectMenu.child?.find(
                                child => child.id === dataResponse.id
                            );
                            if (projectItem) {
                                projectItem.name = dataResponse.title;
                                projectItem.color = dataResponse.color;
                                projectItem.view = dataResponse.view;
                                this.projectService.set(dataResponse);
                            }
                        }
                    },
                });
            },
        });
    }
}
