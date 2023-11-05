import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";
import { Component } from "@angular/core";

@Component({
    selector: "app-status",
    styleUrls: ["./status.component.scss"],
    templateUrl: "./status.component.html"
})
export class StatusComponent implements ICellRendererAngularComp {
    public value: any;
    public status: any;

    agInit(params: ICellRendererParams): void {
        this.value = params.data.value;
        this.status = params.data.status;
    }

    refresh(params: ICellRendererParams): boolean {
        console.log(params);
        return false;
    }
}
