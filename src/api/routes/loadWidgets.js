export default function() {
  return new Promise((resolve, reject) => {
    // make async call to database
    setTimeout(() => {
      if (Math.floor(Math.random() * 3) === 0) {
        reject('Widget load fails 33% of the time. You were unlucky.');
      } else {
        resolve(
          [
            {
              id: 1,
              color: 'Red',
              sprocketCount: 7,
              owner: 'John'
            },
            {
              id: 2,
              color: 'Taupe',
              sprocketCount: 1,
              owner: 'George'
            },
            {
              id: 3,
              color: 'Green',
              sprocketCount: 8,
              owner: 'Ringo'
            },
            {
              id: 4,
              color: 'Blue',
              sprocketCount: 2,
              owner: 'Paul'
            }
          ]);
      }
    }, 1000); // simulate async load
  });
}
