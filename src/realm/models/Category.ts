export default class Transaction {
  static schema = {
    name: 'Category',
    primaryKey: 'id',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
      icon: { type: 'string' },
      type: { type: 'string' },
      isDefault: { type: 'bool', default: false },
    }
  }

  id: string;
  name: string;
  icon: string;
  type: string;
  isDefault: boolean;
}