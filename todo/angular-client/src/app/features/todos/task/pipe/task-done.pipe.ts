import { PipeTransform, Pipe } from '@angular/core';

import { ITask } from '../model/task.model';

@Pipe({
    name: 'taskDone',
})
export class TaskDonePipe implements PipeTransform {
    transform(value: ITask[], isTaskDone: boolean): any {
        console.log(value, isTaskDone);
        if (isTaskDone) {
            return value.filter(task => task.done);
        } else {
            return value.filter(task => !task.done);
        }
    }
}
