import { Store } from 'redux';
import Realm from 'realm';
import seed from './seed';
import { Category, Transaction, Jar } from '../realm/models';
import { collectionChangedAction, initAction } from '../utils/realm/redux/actions';

export default function configureRealm(store: Store<{}>) {
  const realm = new Realm({
    schema: [Transaction, Category, Jar],
    schemaVersion: 13,
    migration: (oldRealm, newRealm) => {
      newRealm.deleteModel(Transaction.schema.name);
      newRealm.deleteModel(Category.schema.name);
    }
  });
  
  // seed(realm);

  // Configure to use along with redux
  store.dispatch(
    initAction({
      schemaNames: realm.schema.map((sm) => sm.name)
    })
  );

  realm.schema.forEach((sm) => {
    realm.objects(sm.name).addListener(() => {
      console.log('dispatch collection changed', sm.name);
      setTimeout(() => { 
        store.dispatch(collectionChangedAction({ schemaName: sm.name, lastChangedTime: Date.now() })) }
      , 1);
    })
  });

  return realm;
};

