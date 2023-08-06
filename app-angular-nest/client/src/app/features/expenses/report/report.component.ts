import { Component, TemplateRef, ViewChild } from "@angular/core";
import { PersonalExpenseService } from "../personal/personal.service";
import { EExpenseCategory } from "../enum/expense-category.enum";
import { ChartData, GroupBarChartData } from "@shared/components/common/chart/model/chart.model";
import { PieChartConfig } from "@shared/components/common/chart/pie-chart/model/pie-chart.model";
import { PieChartConstant } from "@shared/components/common/chart/pie-chart/constant/pie-chart.constant";
import { BarChartConstant } from "@shared/components/common/chart/bar-chart/constant/bar-chart.constant";
import { BarChartConfig, BarChartType } from "@shared/components/common/chart/bar-chart/model/bar-chart.model";
import { CommonConstant } from "@shared/constants";
import { get, size } from "lodash";
import {
    formatDate,
    getDaysAfter,
    getDaysAgo,
    sortObjectByKeyIsDate
} from "@shared/helpers/time.helper";
import { ReportExpenseService } from "./report.service";
import { DialogComponent } from "@shared/components/common/dialog/dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { SelectionTimeRange } from "@shared/model";
import { ButtonTypes } from "@shared/components/common/button/button.enum";
import { getFirstDataObj, getLastDataObj } from "@shared/helpers";
import { PersonalExpense } from "../model/expense.model";

@Component({
    selector: "expense-report",
    templateUrl: "./report.component.html",
    styleUrls: ["./report.component.scss"]
})
export class ReportComponent {
    protected readonly formatDate = formatDate;
    protected readonly NaN = NaN;
    protected readonly ButtonTypes = ButtonTypes;

    @ViewChild("dialogTemplate") dialogTemplate!: TemplateRef<any>;

    pieChartExpenseConfig: PieChartConfig = { ...PieChartConstant.DATA_CONFIG_DEFAULT };
    pieChartIncomeConfig: PieChartConfig = { ...PieChartConstant.DATA_CONFIG_DEFAULT };
    groupBarVerChartIncomeConfig: BarChartConfig = { ...BarChartConstant.DATA_CONFIG_DEFAULT };
    timeRangesData = [...CommonConstant.SELECTION_TIME_RANGE];
    form: FormGroup = new FormGroup({
        startDate: new FormControl(""),
        endDate: new FormControl("")
    });

    timeRangesSelected = {
        timeRange: "",
        timeRangeDetail: ""
    };

    constructor(
            private personalExpenseService: PersonalExpenseService,
            private reportExpenseService: ReportExpenseService,
            public dialog: MatDialog,
            private formBuilder: FormBuilder
    ) {
    }

    ngOnInit() {
        this.updateTimeRangesTitle();
        this.getDataReport();
        this.initForm();
        this.groupBarVerChartIncomeConfig.chartType = BarChartType.StackedVertical;
        this.pieChartExpenseConfig.colorScheme = "horizon";
        this.pieChartIncomeConfig.colorScheme = "forest";
    }

    updateTimeRangesTitle() {
        const selectedTimeRange: SelectionTimeRange | undefined = this.getSelectedTimeRange();
        if (selectedTimeRange) {
            this.timeRangesSelected = {
                timeRange: selectedTimeRange.title,
                timeRangeDetail: (selectedTimeRange.startDate ? formatDate(NaN, selectedTimeRange.startDate.toDateString()):"") + " - " + (selectedTimeRange.endDate ? formatDate(NaN, selectedTimeRange.endDate.toDateString()):"")
            };
        }
        return this.timeRangesSelected;
    }

    getSelectedTimeRange() {
        return this.timeRangesData.find(val => val.checked);
    }

    initForm() {
        this.form = this.formBuilder.group(
                {
                    startDate: ["", [Validators.required]],
                    endDate: ["", [Validators.required]]
                }
        );
    }

    getDataReport() {
        const selectedTimeRange: SelectionTimeRange | undefined = this.getSelectedTimeRange();

        const timeRangeRequest: { startDate: Date | "", endDate: Date | "" } = {
            startDate: get(selectedTimeRange, "startDate", ""),
            endDate: get(selectedTimeRange, "endDate", "")
        };

        this.reportExpenseService.getData(timeRangeRequest).subscribe({
            next: (response) => {
                this.pieChartExpenseConfig.data = this.parseData(response.data, EExpenseCategory.EXPENSE);
                this.pieChartIncomeConfig.data = this.parseData(response.data, EExpenseCategory.INCOME);
                this.groupBarVerChartIncomeConfig.data = this.parseDataBarchart(response.data);
            },
            error: (error) => {
                console.log("Error:", error);
            }
        });
    }

    groupDataByDate(data: PersonalExpense[]): { [key: string]: PersonalExpense[] } {
        let groupedData: { [key: string]: PersonalExpense[] } = {};

        data.forEach(item => {
            const date = new Date(item.date).toDateString();
            if (groupedData[date]) {
                groupedData[date].push(item);
            } else {
                groupedData[date] = [item];
            }
        });

        return groupedData;
    }

    calculateTotalExpense(expenses: PersonalExpense[]): number {
        return expenses.reduce((sum: number, val: PersonalExpense) => sum + val.amount, 0);
    }

    calculateTotalIncome(incomes: PersonalExpense[]): number {
        return incomes.reduce((sum: number, val: PersonalExpense) => sum + val.amount, 0);
    }

    parseDataBarchart(data: PersonalExpense[]): GroupBarChartData[] {
        let groupedData = this.groupDataByDate(data);

        if (size(groupedData) <= 5) {
            groupedData = this.assignEmptyChartData(groupedData);
        }

        return Object.keys(groupedData).map(date => {
            const expenses = groupedData[date].filter((val: PersonalExpense) => val.expenseCategory.type===EExpenseCategory.EXPENSE);
            const incomes = groupedData[date].filter((val: PersonalExpense) => val.expenseCategory.type===EExpenseCategory.INCOME);

            const totalExpense = this.calculateTotalExpense(expenses);
            const totalIncome = this.calculateTotalIncome(incomes);

            return {
                name: date,
                series: [
                    { name: "Expense", value: -totalExpense },
                    { name: "Income", value: totalIncome }
                ]
            };
        });
    }


    parseData(data: PersonalExpense[], type: EExpenseCategory): ChartData[] {
        const result: { [name: string]: number } = {};

        for (const val of data) {
            if (val.expenseCategory?.type===type) {
                const itemName = val.expenseCategory.name;
                const itemValue = val.amount;

                if (result[itemName]) {
                    result[itemName] += itemValue;
                } else {
                    result[itemName] = itemValue;
                }
            }
        }

        return Object.keys(result).map(name => ({
            name: name,
            value: result[name]
        }));
    }

    assignEmptyChartData(data: { [key: string]: PersonalExpense[] }) {
        const dayAgo = 5;
        const firstDateData: string = get(getFirstDataObj(data), "[0].date", "");
        const lastDateData: string = get(getLastDataObj(data), "[0].date", "");
        const dataDaysAgo = getDaysAgo(firstDateData, dayAgo);
        const dataDaysAfter = getDaysAfter(lastDateData, dayAgo);

        dataDaysAgo.forEach(item => {
            const date = new Date(item).toDateString();
            data = { [date]: [], ...data };
        });

        dataDaysAfter.forEach(item => {
            const date = new Date(item).toDateString();
            data = { ...data, [date]: [] };
        });

        data = sortObjectByKeyIsDate(data);
        return data;
    }

    selectTimeRange(item: SelectionTimeRange) {
        this.timeRangesData.forEach((val) => {
            val.checked = false;
        });

        if (item.value==="custom") {
            this.openDialog(item);
        } else {
            item.checked = true;

            const timeRangeRequest: { startDate: Date | "", endDate: Date | "" } = {
                startDate: get(item, "startDate"),
                endDate: get(item, "endDate")
            };

            this.reportExpenseService.getData(timeRangeRequest).subscribe({
                next: (response) => {
                    this.pieChartExpenseConfig.data = this.parseData(response.data, EExpenseCategory.EXPENSE);
                    this.pieChartIncomeConfig.data = this.parseData(response.data, EExpenseCategory.INCOME);
                    this.groupBarVerChartIncomeConfig.data = this.parseDataBarchart(response.data);
                    this.updateTimeRangesTitle();
                }
            });
        }
    }

    openDialog(item: SelectionTimeRange) {
        const dialogRef = this.dialog.open(DialogComponent, {
            data: {
                title: "expenses.waller.createTitle",
                template: this.dialogTemplate,
                labelApply: "common.ok",
                isDisable: () => {
                    return this.form.invalid;
                }
            }
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                const timeRangeRequest: { startDate: Date | "", endDate: Date | "" } = this.form.value;

                this.reportExpenseService.getData(timeRangeRequest).subscribe({
                    next: (response) => {
                        this.pieChartExpenseConfig.data = this.parseData(response.data, EExpenseCategory.EXPENSE);
                        this.pieChartIncomeConfig.data = this.parseData(response.data, EExpenseCategory.INCOME);
                        this.groupBarVerChartIncomeConfig.data = this.parseDataBarchart(response.data);
                        item.checked = true;
                        item.startDate = this.form.value["startDate"];
                        item.endDate = this.form.value["endDate"];
                        this.updateTimeRangesTitle();
                    }
                });
            }
        });
    }

}
