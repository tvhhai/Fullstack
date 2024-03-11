import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskItemDetailComponent } from './task-item-detail.component';

describe('TaskItemDetailComponent', () => {
  let component: TaskItemDetailComponent;
  let fixture: ComponentFixture<TaskItemDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskItemDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
