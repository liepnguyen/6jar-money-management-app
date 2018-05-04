import moment from 'moment';
import { Observable } from 'rxjs';
import { merge } from 'lodash';
import { ActionsObservable } from 'redux-observable';
import { Jar } from '../../realm/models';
import { changeIncomePercentage } from './actions';
import storage from '../../storage';

const changeIncomePercentageEpic = (action$: ActionsObservable<any>) => {
  return action$.ofType(changeIncomePercentage.START)
    .mergeMap((action) => {
      const realm = storage.getRealmInstance();
      const { jarId, newIncomePercentage: incomePercentage } = action.payload;
      let jar = realm.objectForPrimaryKey(Jar, jarId);
			realm.write(() => {
        if (jar) {
          merge(jar, { incomePercentage });
        }
      });
      return Observable.of(changeIncomePercentage.succeeded());
    })
    .takeUntil(action$.ofType(changeIncomePercentage.CANCELLED))
    .catch((err) => {
      return Observable.of(changeIncomePercentage.failed(err));
    });
}

export default [
  changeIncomePercentageEpic,
]