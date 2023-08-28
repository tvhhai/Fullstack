import { Component, Input } from "@angular/core";
import { ISectionTask, ISectionTaskReq } from "../section-task/model/section-task.model";
import { ButtonColor, ButtonTypes } from "@shared/components/common/button/button.enum";
import { ITask, ITaskReq } from "../task/model/task.model";
import { TaskService } from "../task/task.service";
import { SectionTaskService } from "../section-task/section-task.service";
import { isEmptyArray } from "@shared/helpers";

@Component({
  selector: 'app-action-task',
  templateUrl: './action-task.component.html',
  styleUrls: ['./action-task.component.scss']
})
export class ActionTaskComponent {
  protected readonly ButtonTypes = ButtonTypes;
  protected readonly ButtonColor = ButtonColor;
  protected readonly isEmptyArray = isEmptyArray;

  @Input() prjTaskId!: number;

  taskName: string = "";
  taskList: ITask[] = [];
  viewTaskEditor: boolean = false;
  taskDescription: string = "";

  viewAddSection: boolean = false;
  sectionName: string = "";
  sectionTaskList: ISectionTask[] = [];

  constructor(private taskService: TaskService,
              private sectionTaskService: SectionTaskService) {
    console.log(this.prjTaskId);
  }

  onAddTask() {
    this.viewTaskEditor = true;
  }

  onCancelSaveTask() {
    this.viewTaskEditor = false;
  }

  onSaveTask() {
    console.log(this.taskName, this.taskDescription);
    this.viewTaskEditor = false;
    const taskReq: ITaskReq = {
      title: this.taskName,
      description: this.taskDescription,
      projectTask: this.prjTaskId
    };
    this.taskService.create(taskReq).subscribe((res) => {
      console.log(res);
      // this.getTask(this.prjTaskId)
    });
  }

  isValid = (): boolean => {
    return !this.taskName;
  };
  onAddSection() {
    this.viewAddSection = true;
  }

  onSaveSection() {
    console.log(this.sectionName);
    this.viewAddSection = false;

    const sectionTaskReq: ISectionTaskReq = {
      title: this.sectionName,
      projectTask: this.prjTaskId
    };

    this.sectionTaskService.create(sectionTaskReq).subscribe(
        () => {
          // this.getSectionTask(this.prjTaskId);
        }
    );
  }

  onCancelSaveSection() {
    this.viewAddSection = false;
  }

  // isValid = (): boolean => {
  //   return !this.sectionName;
  // };
}
