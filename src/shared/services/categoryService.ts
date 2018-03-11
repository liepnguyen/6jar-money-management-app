import storage from '../../storage';
import { Transaction, Category } from '../../realm/models';

class CategoryService {
  get realm() { return storage.getRealmInstance(); }

  hasAnyAssociatedTransaction = (categoryId: string): boolean => {
    return this.realm.objects(Transaction).filtered('categoryId = $0', categoryId).length > 0;
  }

  isDefault = (categoryId: string): boolean => {
    return this.realm.objectForPrimaryKey<Category>(Category, categoryId).isDefault;
  }
}

export default new CategoryService();