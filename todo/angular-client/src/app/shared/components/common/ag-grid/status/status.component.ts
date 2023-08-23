import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";

@Component({
    selector: "app-status",
    templateUrl: "./status.component.html",
    styleUrls: ["./status.component.scss"]
})
export class StatusComponent implements ICellRendererAngularComp {
    public value: any;
    public status: any;

    agInit(params: ICellRendererParams<any, any, any>): void {
        this.value = params.data.value;
        this.status = params.data.status;
    }

    refresh(params: ICellRendererParams<any, any, any>): boolean {
        return false;
    }
}
