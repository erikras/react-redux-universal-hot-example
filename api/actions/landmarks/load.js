const initialSnippets = {
  "id": 1,
  "title": "The Atrium",
  "slug": "atrium",
  "description": "The collaborative space of awesomeness",
  "area_id": 1,
  "teaser": " The collaborative space of awesomeness",
  "snippets": [
    {
    "id": 2,
    "title": "The Collaborative Atrium",
    "slug": "collab-atria",
    "description": "A scelerisque rutrum congue a condimentum laoreet bibendum quis ut nunc scelerisque a elit enim rutrum mi fringilla per nam ad fames. Aliquet sem a primis a suspendisse cursus habitant quisque augue dictumst vitae a posuere leo purus ultricies eu ridiculus adipiscing vestibulum scelerisque congue facilisis senectus condimentum commodo.",
    "landmark_id": 1,
    "category": "fact",
    "teaser": "A scelerisque rutrum congue a condimentum laoreet bibendum quis ut nunc scelerisque a elit enim rutrum mi fringilla per nam ad fames. Aliquet sem a pri…",
    "image": '/1.jpg'
    },
    {
    "id": 1,
    "title": "The Atrium is cool",
    "slug": "atrium-cool",
    "description": "Blandit tellus erat dictumst vestibulum placerat adipiscing nisl ante platea est a bibendum blandit ullamcorper hac eu id faucibus metus fermentum leo pharetra id libero nisi.Vehicula nisl himenaeos sem nisi dignissim a tempus sem sed lobortis vestibulum luctus vivamus gravida a a adipiscing sodales montes parturient elit et.",
    "landmark_id": 1,
    "category": "history",
    "teaser": "Blandit tellus erat dictumst vestibulum placerat adipiscing nisl ante platea est a bibendum blandit ullamcorper hac eu id faucibus metus fermentum leo…",
    "image": '/2.jpg'
    }
  ]
};

export function getSnippets(req) {
  let snippets = req.session.snippets;
  if (!snippets) {
    snippets = initialSnippets;
    req.session.snippets = snippets;
  }
  return snippets;
}

export default function load(req) {
  return new Promise((resolve, reject) => {
    // make async call to database
    setTimeout(() => {
      if (Math.floor(Math.random() * 3) === -1) { // === 0 for 1/3 bad loads
        reject('Snippet load fails 33% of the time. You were unlucky.');
      } else {
        resolve(getSnippets(req));
      }
    }, 1000); // simulate async load
  });
}
