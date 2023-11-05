import { HttpService } from '@shared/services/http.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { DataRes } from '@shared/model';

import { IProjectReq, IProject } from './model/project.model';
import { ITask } from '../task/model/task.model';
import { ViewState } from '../todos.enum';

@Injectable({
    providedIn: 'root',
})
export class ProjectService {
    constructor(private httpService: HttpService) {}

    private readonly apiPrjTask: string = 'api/project-tasks';

    private dataEditSubject: BehaviorSubject<IProject> =
        new BehaviorSubject<IProject>({
            id: NaN,
            color: '',
            isShowCompleteTask: false,
            sectionTasks: [],
            tasks: [],
            title: '',
            titleSlug: '',
            view: ViewState.List,
        });

    public dataEdit$: Observable<IProject> =
        this.dataEditSubject.asObservable();

    get(): Observable<IProject> {
        return this.dataEdit$;
    }

    set(menu: IProject) {
        this.dataEditSubject.next(menu);
    }

    countTask(item: any): number {
        const taskCount = item.tasks.filter((task: ITask) => !task.done).length;

        let taskInSectionCount = 0;
        for (const sectionTask of item.sectionTasks) {
            taskInSectionCount += sectionTask.tasks.filter(
                (task: ITask) => !task.done
            ).length;
        }
        return taskCount + taskInSectionCount;
    }

    getData(): Observable<DataRes<IProject[]>> {
        return this.httpService.performRequest<DataRes<IProject[]>>(
            'get',
            this.apiPrjTask
        );
    }

    getById(id: number): Observable<DataRes<IProject>> {
        return this.httpService.performRequestNotLoading<DataRes<IProject>>(
            'get',
            this.apiPrjTask + '/' + id
        );
    }

    create(data: IProjectReq): Observable<DataRes<IProject>> {
        return this.httpService.performRequest<DataRes<IProject>>(
            'post',
            this.apiPrjTask,
            data
        );
    }

    update(prjId: number, data: IProjectReq): Observable<DataRes<IProject>> {
        return this.httpService.performRequestNotLoading<DataRes<IProject>>(
            'patch',
            this.apiPrjTask + '/' + prjId,
            data
        );
    }
}
