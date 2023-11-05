import { ViewEncapsulation, Component, OnInit } from "@angular/core";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-sidebar',
  styleUrls: ['./sidebar.component.scss'],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    console.log();
  }
}
