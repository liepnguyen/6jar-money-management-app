import { combineEpics } from 'redux-observable';

import cveTransactionEpics from '../screens/CVETransaction/epics';
import cveCategoryEpics from '../screens/CVECategory/epics';
import jarAdjustmentEpics from '../screens/JarAdjustment/epics';

export default combineEpics(
  ...cveTransactionEpics,
  ...cveCategoryEpics,
  ...jarAdjustmentEpics,
);