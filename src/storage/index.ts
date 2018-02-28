import Realm from 'realm';

class Storage {
  _realm: Realm;

  setRealmInstance = (realm: Realm) => {
    this._realm = realm;
  }

  getRealmInstance = (): Realm => {
    return this._realm;
  }
}

export default new Storage();