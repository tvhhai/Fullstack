import { getTimeRange, getTodayTimeRange } from "@shared/helpers/time.helper";
import { EDuration } from "@shared/enum/dayjs-format";
import { SelectionTimeRange } from "../model";

export class CommonConstant {
    public static readonly FAKE_PASSWORD: string = "********";

    public static readonly SELECTION_TIME_RANGE: SelectionTimeRange[] = [
        {
            title: "Today", value: "today", checked: false,
            startDate: getTodayTimeRange().startTime,
            endDate: getTodayTimeRange().endTime
        },
        {
            title: "This month",
            value: "thisMonth",
            checked: true,
            startDate: getTimeRange(EDuration.MONTH).startDate,
            endDate: getTimeRange(EDuration.MONTH).endDate
        },
        {
            title: "Last month", value: "lastMonth", checked: false,
            startDate: getTimeRange(EDuration.MONTH, 1).startDate,
            endDate: getTimeRange(EDuration.MONTH, 1).endDate
        },
        {
            title: "Last 3 months", value: "last3Month", checked: false,
            startDate: getTimeRange(EDuration.MONTH, 3).startDate,
            endDate: getTimeRange(EDuration.MONTH, 3).endDate
        },
        {
            title: "Last 6 months", value: "last6Month", checked: false,
            startDate: getTimeRange(EDuration.MONTH, 6).startDate,
            endDate: getTimeRange(EDuration.MONTH, 6).endDate
        },
        {
            title: "This year", value: "thisYear", checked: false,
            startDate: getTimeRange(EDuration.YEAR).startDate,
            endDate: getTimeRange(EDuration.YEAR).endDate
        },
        {
            title: "Last year", value: "thisYear", checked: false,
            startDate: getTimeRange(EDuration.YEAR, 1).startDate,
            endDate: getTimeRange(EDuration.YEAR, 1).endDate
        },
        {
            title: "Custom", value: "custom", checked: false,
            startDate: "",
            endDate: ""
        }
    ];
}
