import { Component } from '@angular/core';

@Component({
  selector: 'app-system-setting',
  styleUrls: ['./system-setting.component.scss'],
  templateUrl: './system-setting.component.html',
})
export class SystemSettingComponent {
  languageSettings: any[] = [
    {
      name: '',
      value: '',
    },
    {
      name: '',
      value: '',
    },
  ];

  constructor() {}
}
