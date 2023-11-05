import { getTodayTimeRange, getTimeRange } from '@shared/helpers/time.helper';
import { EDuration } from '@shared/enum/dayjs-format';

import { SelectionTimeRange } from '../model';

export class CommonConstant {
  public static readonly FAKE_PASSWORD: string = '********';

  public static readonly SELECTION_TIME_RANGE: SelectionTimeRange[] = [
    {
      checked: false,
      endDate: getTodayTimeRange().endTime,
      startDate: getTodayTimeRange().startTime,
      title: 'Today',
      value: 'today',
    },
    {
      checked: true,
      endDate: getTimeRange(EDuration.MONTH).endDate,
      startDate: getTimeRange(EDuration.MONTH).startDate,
      title: 'This month',
      value: 'thisMonth',
    },
    {
      checked: false,
      endDate: getTimeRange(EDuration.MONTH, 1).endDate,
      startDate: getTimeRange(EDuration.MONTH, 1).startDate,
      title: 'Last month',
      value: 'lastMonth',
    },
    {
      checked: false,
      endDate: getTimeRange(EDuration.MONTH, 3).endDate,
      startDate: getTimeRange(EDuration.MONTH, 3).startDate,
      title: 'Last 3 months',
      value: 'last3Month',
    },
    {
      checked: false,
      endDate: getTimeRange(EDuration.MONTH, 6).endDate,
      startDate: getTimeRange(EDuration.MONTH, 6).startDate,
      title: 'Last 6 months',
      value: 'last6Month',
    },
    {
      checked: false,
      endDate: getTimeRange(EDuration.YEAR).endDate,
      startDate: getTimeRange(EDuration.YEAR).startDate,
      title: 'This year',
      value: 'thisYear',
    },
    {
      checked: false,
      endDate: getTimeRange(EDuration.YEAR, 1).endDate,
      startDate: getTimeRange(EDuration.YEAR, 1).startDate,
      title: 'Last year',
      value: 'thisYear',
    },
    {
      checked: false,
      endDate: '',
      startDate: '',
      title: 'Custom',
      value: 'custom',
    },
  ];
}
