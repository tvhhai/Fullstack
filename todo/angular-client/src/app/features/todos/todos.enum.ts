export enum ViewState {
  Board = 'board',
  List = 'list',
}

export enum ActionMode {
  Add = 'add',
  Edit = 'edit',
}

export enum ETaskPriority {
  Priority1 = 'Priority 1',
  Priority2 = 'Priority 2',
  Priority3 = 'Priority 3',
  Priority4 = 'Priority 4',
}

export enum ETaskSectionItemId {
  DueDate = 'dueDate',
  Priority = 'priority',
}

export enum EDueDateId {
  NextWeek = 'NEXT_WEEK',
  NoDate = 'NO_DATE',
  PickDate = 'PICK_DATE',
  ThisWeek = 'THIS_WEEK',
  Today = 'TODAY',
  Tomorrow = 'TOMORROW',
}
