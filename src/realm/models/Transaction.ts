export default class Transaction {
  static schema = {
    name: 'Transaction',
    primaryKey: 'id',
    properties: {
      id: { type: 'string' },
      date: { type: 'int' },
      amount: { type: 'double' },
      categoryId: { type: 'string' },
      accountId: { type: 'string?' },
      createdTimestamp: { type: 'int' },
      type: { type: 'string' }
    }
  }

  id: string;
  date: number;
  amount: number;
  categoryId: string;
  accountId: string;
  type: string;
  createdTimestamp: number;
}