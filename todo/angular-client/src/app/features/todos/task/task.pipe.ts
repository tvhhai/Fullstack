import { PipeTransform, Pipe } from '@angular/core';

import { ITask } from './model/task.model';

@Pipe({
    name: 'countTask',
})
export class TaskPipe implements PipeTransform {
    transform(taskArr: ITask[], ...args: unknown[]): number {
        const taskCount = taskArr.filter(task => !task.done);
        return taskCount.length;
    }
}
