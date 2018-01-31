import PouchDB from 'pouchdb-react-native';

export default function configurePouchDb(): any {
  let localDB = new PouchDB('six_jars');

  // var url = 'http://192.168.60.88:5984/test1';
  // var opts = { live: true, retry: true };
  // localDB.replicate.from(url).on('complete', () => {
  //   localDB.sync(url, opts)
  //     .on('error', () => {
  //       console.log('sync error');
  //     });
  // });

  localDB.allDocs({include_docs: true}).then(allDocs => {
    return allDocs.rows.map(row => {
      console.log(row);
      return {_id: row.id, _rev: row.doc._rev, _deleted: true};
    });
  }).then(deleteDocs => {
    return localDB.bulkDocs(deleteDocs);
  }).then(() => {
    return seedData(localDB);
  });
  
  return localDB;
}

const seedData = (db) => {
  const user = {
    _id: "user:liepnguyen.it@gmail.com",
    username: "liepnguyen.it@gmail.com",
    name: "Liep Nguyen",
    type: "user"
  }

  const categories = [
    {
      _id: "user:liepnguyen.it@gmail.com:category:income:gifts",
      name: "Gifts",
      type: "category",
      subType: "income"
    },
    {
      _id: "user:liepnguyen.it@gmail.com:category:income:selling",
      name: "Selling",
      type: "category",
      subType: "income"
    },
    {
      _id: "user:liepnguyen.it@gmail.com:category:income:interest-money",
      name: "Interest Money",
      type: "category",
      subType: "income"
    },
    {
      _id: "user:liepnguyen.it@gmail.com:category:income:salary",
      name: "Salary",
      type: "category",
      subType: "income"
    },
    {
      _id: "user:liepnguyen.it@gmail.com:category:income:award",
      name: "Award",
      type: "category",
      subType: "income"
    },
    {
      _id: "user:liepnguyen.it@gmail.com:category:income:others",
      name: "Others",
      type: "category",
      subType: "income"
    },
    {
      _id: "user:liepnguyen.it@gmail.com:category:expense:fees-charges",
      name: "Fees & Charges",
      type: "category",
      subType: "expense"
    },
    {
      _id: "user:liepnguyen.it@gmail.com:category:expense:insurances",
      name: "Insurances",
      type: "category",
      subType: "expense"
    },
    {
      _id: "user:liepnguyen.it@gmail.com:category:expense:family",
      name: "Family",
      type: "category",
      subType: "expense"
    },
    {
      _id: "user:liepnguyen.it@gmail.com:category:expense:education",
      name: "Education",
      type: "category",
      subType: "expense"
    },
  ];

  db.put(user);
  db.bulkDocs(categories);
}

