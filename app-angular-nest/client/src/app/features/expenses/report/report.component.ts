import { Component, TemplateRef, ViewChild } from "@angular/core";
import { EExpenseCategory } from "../enum/expense-category.enum";
import { PieChartConstant } from "@shared/components/common/chart/pie-chart/constant/pie-chart.constant";
import { BarChartConstant } from "@shared/components/common/chart/bar-chart/constant/bar-chart.constant";
import { AppConstant, CommonConstant } from "@shared/constants";
import { get, size } from "lodash";
import {
    getDaysAfter,
    getDaysAgo,
    sortObjectByKeyIsDate,
} from "@shared/helpers/time.helper";
import { ReportExpenseService } from "./report.service";
import { DialogComponent } from "@shared/components/common/dialog/dialog.component";
import { MatDialog } from "@angular/material/dialog";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from "@angular/forms";
import { SelectionTimeRange } from "@shared/model";
import { ButtonTypes } from "@shared/components/common/button/button.enum";
import { getFirstDataObj, getLastDataObj, isEmptyArray } from "@shared/helpers";
import { PersonalExpense } from "../model/expense.model";
import { PieChartOptions } from "@shared/components/common/chart/pie-chart/model/pie-chart.model";
import { BarChartOptions } from "@shared/components/common/chart/bar-chart/model/bar-chart.model";
import { CartWidgetItem, parsePieChartData } from "./model/report.model";
import { HelpersService } from "@shared/helpers/helper.service";
import { TimeHelpersService } from "@shared/helpers/time.helper.service";

@Component({
    selector: "expense-report",
    templateUrl: "./report.component.html",
    styleUrls: ["./report.component.scss"],
})
export class ReportComponent {
    protected readonly isEmptyArray = isEmptyArray;
    protected readonly NaN = NaN;
    protected readonly ButtonTypes = ButtonTypes;

    @ViewChild("dialogTemplate") dialogTemplate!: TemplateRef<any>;

    pieChartExpenseConfig: PieChartOptions = {
        ...PieChartConstant.DATA_CONFIG_PIE_CHART_DEFAULT,
    };
    pieChartIncomeConfig: PieChartOptions = {
        ...PieChartConstant.DATA_CONFIG_PIE_CHART_DEFAULT,
    };
    groupBarVerChartIncomeConfig: BarChartOptions = {
        ...BarChartConstant.DATA_CONFIG_BAR_CHART_DEFAULT,
    };

    timeRangesData = [...CommonConstant.SELECTION_TIME_RANGE];
    form: FormGroup = new FormGroup({
        startDate: new FormControl(""),
        endDate: new FormControl(""),
    });
    timeRangesSelected = {
        timeRange: "",
        timeRangeDetail: "",
    };
    cartWidget: CartWidgetItem[] = [];

    constructor(
        private reportExpenseService: ReportExpenseService,
        public timeHelpersService: TimeHelpersService,
        private dialog: MatDialog,
        private helpersService: HelpersService,
        private formBuilder: FormBuilder
    ) {
    }

    ngOnInit() {
        this.updateTimeRangesTitle();
        this.getDataReport();
        this.initForm();
        this.pieChartConfig();
        this.barChartConfig();
    }

    updateTimeRangesTitle() {
        const selectedTimeRange: SelectionTimeRange | undefined =
            this.getSelectedTimeRange();
        if (selectedTimeRange) {
            this.timeRangesSelected = {
                timeRange: selectedTimeRange.title,
                timeRangeDetail:
                    (selectedTimeRange.startDate
                        ? this.timeHelpersService.formatDate(
                            NaN,
                            selectedTimeRange.startDate.toDateString()
                        )
                        : "") +
                    " - " +
                    (selectedTimeRange.endDate
                        ? this.timeHelpersService.formatDate(
                            NaN,
                            selectedTimeRange.endDate.toDateString()
                        )
                        : ""),
            };
        }
        return this.timeRangesSelected;
    }

    getDataReport() {
        const selectedTimeRange: SelectionTimeRange | undefined =
            this.getSelectedTimeRange();

        const timeRangeRequest: {
            startDate: Date | "";
            endDate: Date | "";
        } = {
            startDate: get(selectedTimeRange, "startDate", ""),
            endDate: get(selectedTimeRange, "endDate", ""),
        };

        this.reportExpenseService.getData(timeRangeRequest).subscribe({
            next: (response) => {
                this.updateData(response.data);
            },
            error: (error) => {
                console.log("Error:", error);
            },
        });
    }

    initForm() {
        this.form = this.formBuilder.group({
            startDate: ["", [Validators.required]],
            endDate: ["", [Validators.required]],
        });
    }

    pieChartConfig() {
        this.pieChartExpenseConfig.plotOptions =
            this.pieChartIncomeConfig.plotOptions = {
                pie: {
                    donut: {
                        size: "75%",
                        labels: {
                            show: true,
                            name: {},
                            value: {
                                formatter(val: string): string {
                                    return val.toLocaleString();
                                },
                            },
                        },
                    },
                },
            };
        this.pieChartExpenseConfig.tooltip = this.pieChartIncomeConfig.tooltip = {
            y: {
                formatter(val: number, opts?: any): string {
                    return val.toLocaleString();
                },
            },
        };
        this.pieChartExpenseConfig.chart = this.pieChartIncomeConfig.chart = {
            height: 300,
            type: "donut",
        };
    }

    barChartConfig() {
        this.groupBarVerChartIncomeConfig.plotOptions = {
            bar: {
                horizontal: false,
            },
        };
        this.groupBarVerChartIncomeConfig.chart = {
            height: 300,
            stacked: true,
            type: "bar",
        };
        this.groupBarVerChartIncomeConfig.yaxis = {
            labels: {
                formatter(val: number, opts?: any): string | string[] {
                    return val.toLocaleString();
                },
            },
        };
    }

    getSelectedTimeRange() {
        return this.timeRangesData.find((val) => val.checked);
    }

    updateData(data: PersonalExpense[]) {
        const dataExpense = this.parseData(data, EExpenseCategory.EXPENSE);
        this.pieChartExpenseConfig.series = dataExpense.series;
        this.pieChartExpenseConfig.labels = dataExpense.labels;

        const dataIncome = this.parseData(data, EExpenseCategory.INCOME);
        this.pieChartIncomeConfig.series = dataIncome.series;
        this.pieChartIncomeConfig.labels = dataIncome.labels;

        const barchart = this.parseDataBarchart(data);
        this.groupBarVerChartIncomeConfig.series = barchart.series;
        this.groupBarVerChartIncomeConfig.xaxis = {
            categories: barchart.labels,
        };

        this.analyst(dataExpense, dataIncome, data);
    }

    analyst(
        dataExpense: parsePieChartData,
        dataIncome: parsePieChartData,
        allData: PersonalExpense[]
    ) {
        const totalExpense: number = dataExpense.total;
        const totalIncome: number = dataIncome.total;

        this.cartWidget = [
            {
                value: this.helpersService.formatCurrency(totalIncome),
                title: "expenses.income.title",
                color: AppConstant.COLOR_ACCENT.HIGH.color,
            },
            {
                value: this.helpersService.formatCurrency(totalExpense),
                title: "expenses.title",
                color: AppConstant.COLOR_ACCENT.LOW.color,
            },
            {
                value: "0",
                title: "Balance",
                color: AppConstant.COLOR_ACCENT.MEDIUM.color,
            },
            {
                value: allData.length,
                title: "expenses.transactions",
                color: AppConstant.COLOR_ACCENT.CRITICAL.color,
            },
        ];
    }

    groupDataByDate(data: PersonalExpense[]): {
        [key: string]: PersonalExpense[];
    } {
        let groupedData: {
            [key: string]: PersonalExpense[];
        } = {};

        data.forEach((item) => {
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
        return expenses.reduce(
            (sum: number, val: PersonalExpense) => -(sum + val.amount),
            0
        );
    }

    calculateTotalIncome(incomes: PersonalExpense[]): number {
        return incomes.reduce(
            (sum: number, val: PersonalExpense) => sum + val.amount,
            0
        );
    }

    parseDataBarchart(data: PersonalExpense[]): parsePieChartData {
        let groupedData = this.groupDataByDate(data);

        if (size(groupedData) <= 5) {
            groupedData = this.assignEmptyChartData(groupedData);
        }

        let incomeSeries: number[] = [];
        let expenseSeries: number[] = [];
        let labels: string[] = [];

        Object.keys(groupedData).map((date) => {
            const expenses = groupedData[date].filter(
                (val: PersonalExpense) =>
                    val.expenseCategory.type === EExpenseCategory.EXPENSE
            );
            const incomes = groupedData[date].filter(
                (val: PersonalExpense) =>
                    val.expenseCategory.type === EExpenseCategory.INCOME
            );

            const totalExpense = this.calculateTotalExpense(expenses);
            const totalIncome = this.calculateTotalIncome(incomes);

            expenseSeries.push(totalExpense);
            incomeSeries.push(totalIncome);
            labels.push(date);
        });

        return {
            series: [
                {
                    name: "Expense",
                    data: expenseSeries,
                },
                {
                    name: "Income",
                    data: incomeSeries,
                },
            ],
            labels: labels,
        };
    }

    parseData(
        data: PersonalExpense[],
        type: EExpenseCategory
    ): parsePieChartData {
        const result: {
            [name: string]: number;
        } = {};

        for (const val of data) {
            if (val.expenseCategory?.type === type) {
                const itemName = val.expenseCategory.name;
                const itemValue = val.amount;

                if (result[itemName]) {
                    result[itemName] += itemValue;
                } else {
                    result[itemName] = itemValue;
                }
            }
        }

        const series = Object.keys(result).map((name) => result[name]);
        const labels = Object.keys(result).map((name) => name);
        const total = Object.values(result).reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
        );

        return { series, labels, total };
    }

    assignEmptyChartData(data: { [key: string]: PersonalExpense[] }) {
        const dayAgo = 2;
        const firstDateData: string = get(getFirstDataObj(data), "[0].date", "");
        const lastDateData: string = get(getLastDataObj(data), "[0].date", "");
        const dataDaysAgo = getDaysAgo(firstDateData, dayAgo);
        const dataDaysAfter = getDaysAfter(lastDateData, dayAgo);

        dataDaysAgo.forEach((item) => {
            const date = new Date(item).toDateString();
            data = { [date]: [], ...data };
        });

        dataDaysAfter.forEach((item) => {
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

        if (item.value === "custom") {
            this.openDialog(item);
        } else {
            item.checked = true;

            const timeRangeRequest: {
                startDate: Date | "";
                endDate: Date | "";
            } = {
                startDate: get(item, "startDate"),
                endDate: get(item, "endDate"),
            };

            this.reportExpenseService.getData(timeRangeRequest).subscribe({
                next: (response) => {
                    this.updateData(response.data);
                    this.updateTimeRangesTitle();
                },
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
                },
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                const timeRangeRequest: {
                    startDate: Date | "";
                    endDate: Date | "";
                } = this.form.value;

                this.reportExpenseService.getData(timeRangeRequest).subscribe({
                    next: (response) => {
                        this.updateData(response.data);

                        item.checked = true;
                        item.startDate = this.form.value["startDate"];
                        item.endDate = this.form.value["endDate"];
                        this.updateTimeRangesTitle();
                    },
                });
            }
        });
    }
}
