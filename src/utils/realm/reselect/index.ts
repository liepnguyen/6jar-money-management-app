import Realm from 'realm';
import { get } from 'lodash';
import storage from '../../../storage';

export const createRealmQueryableSelector = (type: Function, computeFunc: (collection: Realm.Results<any>) => any) => {
  let prevState;
  let prevResult;
  const schemaName = get(type, 'schema.name');
  const dummyStatePath = `realm.collections.${schemaName}.dummyState`;
  return (state) => {
    const shouldUpdate = get(state, dummyStatePath) !== get(prevState, dummyStatePath);
    let result;
    if (shouldUpdate) {
      const realm = storage.getRealmInstance();
      console.log('@createRealmQuery: recompute');
      result = computeFunc(realm.objects(schemaName));
    } else {
      console.log('@createRealmQuery: return prev value');
      result = prevResult;
    }
    prevResult = result;
    prevState = state;
    return result;
  }
}