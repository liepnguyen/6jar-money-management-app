import { range } from 'lodash';
import { createSelector } from 'reselect';
import moment from 'moment';

export const screenStateSelector = (state) => { return state.screens.viewTransactions; }

export const filterSelector = createSelector(
  screenStateSelector, (screenState) => {
    return screenState.filter;
  }
);

export const timeRangeSelector = createSelector(
  filterSelector, (filter) => {
    return filter.timeRange;
  }
);

export const tabsSelector = createSelector(
  timeRangeSelector, (timeRange) => {
    if (timeRange.range === 'day') {
      const days = range(18, -2).map((i) => { return moment().startOf('d').subtract(i, 'd'); });
      return days.map((m) => { return { from: m.valueOf(), to: moment(m).endOf('d').valueOf(), type: 'day' } });
    } else if (timeRange.range === 'year') {
      const days = range(18, -2).map((i) => { return moment().startOf('y').subtract(i, 'y'); });
      return days.map((m) => { return { from: m.valueOf(), to: moment(m).endOf('y').valueOf(), type: 'year' } });
    }
    const months = range(18, -2).map((i) => { return moment().startOf('M').subtract(i, 'M'); });
    return months.map((m) => { return { from: m.valueOf(), to: moment(m).endOf('M').valueOf(), type: 'month' } });
  }
);

