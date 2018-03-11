import moment from 'moment';
import { Observable } from 'rxjs';
import { merge } from 'lodash';
import { ActionsObservable } from 'redux-observable';
import { saveTransaction, deleteTransactionAsync } from './actions';
import { Transaction } from '../../realm/models';
import storage from '../../storage';

const saveTransactionEpic = (action$: ActionsObservable<any>) => {
  return action$.ofType(saveTransaction.START)
    .mergeMap((action) => {
      const realm = storage.getRealmInstance();
      const transaction = action.payload;
      let persistedTransaction = realm.objectForPrimaryKey(Transaction, transaction.id);
			realm.write(() => {
        if (persistedTransaction) {
          merge(persistedTransaction, transaction);
        } else {
          persistedTransaction = realm.create(Transaction, {
            ...transaction,
            createdTimestamp: moment().valueOf(),
          });
        }
      });
      return Observable.of(saveTransaction.succeeded());
    })
    .takeUntil(action$.ofType(saveTransaction.CANCELLED))
    .catch((err) => {
      return Observable.of(saveTransaction.failed(err));
    });
}

const deleteTransactionEpic = (action$: ActionsObservable<any>) => {
  return action$.ofType(deleteTransactionAsync.START)
    .mergeMap((action) => {
      const realm = storage.getRealmInstance();
      const id = action.payload;
			realm.write(() => {
        let persistedTransaction = realm.objectForPrimaryKey(Transaction, id);
        persistedTransaction && realm.delete(persistedTransaction);
      });
      return Observable.of(deleteTransactionAsync.succeeded());
    })
    .takeUntil(action$.ofType(deleteTransactionAsync.CANCELLED))
    .catch((err) => {
      return Observable.of(deleteTransactionAsync.failed(err));
    });
}

export default [
  saveTransactionEpic,
  deleteTransactionEpic,
]