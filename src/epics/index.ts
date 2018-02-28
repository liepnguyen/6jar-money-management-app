import { combineEpics } from 'redux-observable';

import transactionEpics from '../services/redux/transaction/epics';

export default combineEpics(
  ...transactionEpics,
);