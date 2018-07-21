const fs = require('fs');

const dotenv = require('dotenv');

const envConfig = dotenv.parse(fs.readFileSync('.env.development.local'));

for (var k in envConfig) {
  process.env[k] = envConfig[k];
}

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDOR_ID
};

const firebase = require('firebase');

firebase.initializeApp(config);

const scheme = JSON.parse(String(fs.readFileSync('src/data/scheme.json')));

const db = firebase.firestore();

db.settings({ timestampsInSnapshots: true });

Promise.all(
  scheme.collections.map(collection => {
    const services = db.collection(collection);

    const query = services
      .limit(100)
      .orderBy('created')
      .startAt(0);

    return query
      .get()
      .then(({ docs }) => {
        const list = docs.map(doc => ({ id: doc.id, ...doc.data() }));

        return list;
      })
      .catch(error => {
        console.error(error);
      });
  })
).then(results => {
  results.forEach((result, index) => {
    fs.writeFileSync(
      `./src/data/collections/${scheme.collections[index]}.json`,
      JSON.stringify(result)
    );
  });

  process.exit(0);
});
