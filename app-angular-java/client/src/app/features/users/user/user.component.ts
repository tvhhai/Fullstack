import {Component} from '@angular/core';
import {ColumnApi, GridApi} from "ag-grid-community";


@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent1 {

    gridApi!: GridApi;
    columnApi!: ColumnApi;

    columnDefs: ({ field: string })[] = [
        {field: 'make'},
        {field: 'model'},
        {field: 'price'}
    ]

    rowData: any[] = [
        {
            "make": "Porsche",
            "model": "Boxter",
            "price": 72000,
        },
        {
            "make": "Ford",
            "model": "Mondeo",
            "price": 32000,
        },
        {
            "make": "Ford",
            "model": "Mondeo",
            "price": 32000,
        },     {
            "make": "Porsche",
            "model": "Boxter",
            "price": 72000,
        },
        {
            "make": "Ford",
            "model": "Mondeo",
            "price": 32000,
        },
        {
            "make": "Ford",
            "model": "Mondeo",
            "price": 32000,
        },     {
            "make": "Porsche",
            "model": "Boxter",
            "price": 72000,
        },
        {
            "make": "Ford",
            "model": "Mondeo",
            "price": 32000,
        },
        {
            "make": "Ford",
            "model": "Mondeo",
            "price": 32000,
        },     {
            "make": "Porsche",
            "model": "Boxter",
            "price": 72000,
        },
        {
            "make": "Ford",
            "model": "Mondeo",
            "price": 32000,
        },
        {
            "make": "Ford",
            "model": "Mondeo",
            "price": 32000,
        },     {
            "make": "Porsche",
            "model": "Boxter",
            "price": 72000,
        },
        {
            "make": "Ford",
            "model": "Mondeo",
            "price": 32000,
        },
        {
            "make": "Ford",
            "model": "Mondeo",
            "price": 32000,
        },     {
            "make": "Porsche",
            "model": "Boxter",
            "price": 72000,
        },
        {
            "make": "Ford",
            "model": "Mondeo",
            "price": 32000,
        },
        {
            "make": "Ford",
            "model": "Mondeo",
            "price": 32000,
        }
    ]

    onGridReady(params: { api: GridApi, columnApi: ColumnApi }) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;
        // console.log(this.gridApi, this.columnApi)
    }
}
