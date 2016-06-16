import load from './load';

export default function update(req) {
  return new Promise((resolve, reject) => {
    // write to database
    setTimeout(() => {
      if (Math.random() < 0.2) {
        reject('Oh no! Widget save fails 20% of the time. Try again.');
      } else {
        load(req).then(data => {
          const widgets = data;
          const widget = req.body;
          if (widget.color === 'Green') {
            reject({
              color: 'We do not accept green widgets' // example server-side validation error
            });
          }
          if (widget.id) {
            widgets[widget.id - 1] = widget;  // id is 1-based. please don't code like this in production! :-)
            req.session.widgets = widgets;
          }
          resolve(widget);
        }, err => {
          reject(err);
        });
      }
    }, 1500); // simulate async db write
  });
}
