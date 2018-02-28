import Realm from 'realm';
import uuid from 'uuid';
import { range, random } from 'lodash';
import { categories, jars } from './data';
import { Category, Jar, Transaction } from '../../realm/models';

export default function seed(realm: Realm) {
  realm.write(() => {
    realm.deleteAll();

    // seed categories
    categories.forEach((cat) => {
      realm.create(Category, { 
        id: uuid.v4(),
        name: cat.name,
        type: cat.type,
        icon: cat.icon,
      })
    });
    console.log('Seeding categories was done', realm.objects(Category));

    // seed accounts
    jars.forEach((jar) => {
      realm.create(Jar, { 
        id: uuid.v4(),
        name: jar.name,
        incomePercentage: jar.incomePercentage,
        available: jar.available,
        icon: jar.icon,
        avatar: jar.avatar,
      })
    });
    console.log('Seeding jars was done', realm.objects(Jar));

    // seed transaction
    const categoryIds = realm.objects<Category>(Category).map((cat) => cat.id);
    range(0, 0).forEach(() => {
      realm.create(Transaction, {
        id: uuid.v4(),
        date: (new Date(random(2018, 2048), random(0, 11), random(0, 30))).valueOf(),
        amount: random(10, 20000) * 1000,
        categoryId: categoryIds[random(0, categories.length - 1)],
        accountId: null,
        createdTimestamp: Date.now(),
        type: ['income', 'expense'][random(0, 1)],
      })
    })
  })
}