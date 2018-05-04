import storage from '../../storage';
import { Transaction, Category } from '../../realm/models';

class CategoryService {
  get realm() { return storage.getRealmInstance(); }

  hasAnyAssociatedTransaction = (categoryId: string): boolean => {
    return this.realm.objects(Transaction).filtered('categoryId = $0', categoryId).length > 0;
  }

  isNameDuplicated = (categoryId: string, categoryName: string): boolean => {
    return this.realm.objects(Category).filtered('id != $0 && name = $1', categoryId, categoryName).length > 0;
  }
}

export default new CategoryService();