export default class Jar {
  static schema = {
    name: 'Jar',
    primaryKey: 'id',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
      incomePercentage: { type: 'double' },
      available: { type: 'double' },
      icon: { type: 'string' },
      avatar: { type: 'string' }
    }
  }

  id: string;
}