import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AgGridService {
  constructor() {}
  selectedRows: any[] = [];
}